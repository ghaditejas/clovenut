const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const pino = require("express-pino-logger")();
var cors = require("cors");
const dotenv = require("dotenv");
var mysql = require("mysql");
var path = require('path');
dotenv.config();
var connection =  mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: "clovenut",
});
// connection.connect();

const app = express();
var dir = path.join(__dirname, 'images');
const crypto = require('crypto');
app.use(pino);
app.use(cors());
app.use(express.static(dir));
app.use(express.json({ limit: "50mb" }));
// var AWS = require('aws-sdk');
// var accessKeyId =  process.env.AWS_ACCESS_KEY;
// var secretAccessKey = process.env.AWS_SECRET_KEY;
// AWS.config.update({
// 	accessKeyId: accessKeyId,
// 	secretAccessKey: secretAccessKey
// });
// var s3 = new AWS.S3();
const multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/images/')
  },
  filename: function (req, file, cb) {
		const newFileName= Date.now()+file.originalname;
    cb(null, newFileName); // modified here  or user file.mimetype
  }
})
const upload =  multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }])
app.use(
	express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const API_KEY = process.env.API_KEY;
const API_PASSWORD = process.env.API_PASSWORD;
const SIMULARTKEY = process.env.STIMULART_API_SECRET;
const headers = {
	"Content-Type": "application/json",
	"X-Shopify-Access-Token": process.env.API_PASSWORD,
};
app.post("/api/product", (req, res) => {
	console.log("heress");
	const { productImage, price, title, body_html, vendor, product_type, imageUrl, frameDimension, sku } = req.body.product;
	axios
		.post(
			`https://${API_KEY}:${API_PASSWORD}@clovenut.myshopify.com/admin/api/2021-07/products.json`,
			{
				product: {
					title: title,
					body_html: body_html,
					vendor: vendor,
					product_type: product_type,
					variants: [
						{
							price: price,
							fulfillment_service: "manual",
							sku: sku
						},
					],
					images: [
						{
							attachment: productImage,
						},
					],
					metafields: [
						{
							key: "uploadCare Url",
							value: imageUrl,
							value_type: "string",
							namespace: "global",
						},
						{
							key: "frame size",
							value: frameDimension,
							value_type: "string",
							namespace: "global",
						},
					],
				},
			},
			headers
		)
		.then((response) => {
			console.log(response, "responseid");
			axios
				.put(
					`https://${API_KEY}:${API_PASSWORD}@clovenut.myshopify.com/admin/api/2021-07/product_listings/${response.data.product.id}.json`,
					{
						product_listing: {
							product_id: response.data.product.id,
						},
					},
					headers
				)
				.then((response) => {
					console.log(response, "response");
					res.setHeader("Content-Type", "application/json");
					res.send(response.data);
				});
		})
		.catch((error) => {
			console.log(error.message, "error");
		});
});

app.get("/api/getProduct/:id", (req, res) => {
	const { productImage } = req.body.product;
	axios
		.get(
			`https://${API_KEY}:${API_PASSWORD}@clovenut.myshopify.com/admin/api/2021-07/products/${req.params.id}.json`,
			{},
			headers
		)
		.then((response) => {
			console.log(response, "response");
			res.setHeader("Content-Type", "application/json");
			res.send(response.data);
		})
		.catch((error) => {
			console.log(error.message, "error");
		});
});

app.get("/api/getFrames", (req, res) => {
	connection.query("SELECT * from Frame", function (error, results, fields) {
		if (error) throw error;
		console.log(results, "results");
		res.send(results);
	});
});

app.post('/api/getDefaultFrame', (req, res) => {
	const {frameCode} = req.body;
	connection.query("SELECT * from Frame Where Frame_Code = '"+frameCode+"'", function (error, results, fields) {
		if (error) throw error;
		console.log(results, "results");
		res.send(results);
	});
})

app.post("/api/buildImage", (req, res) => {
	// const { m1, aw, ah, iw, ih, imgUrl, p1, pphf, stretchImg, smount, print,glass } = req.body;
	let apiUrl = `https://apieu.simulartstudio.com/apiglobv6.php?key=${SIMULARTKEY}&uniqueId=${SIMULARTKEY}`;
	Object.keys(req.body).map(key => apiUrl = apiUrl+`&${key}=${req.body[key]}`)
	console.log(apiUrl,'url');
	axios
		.get(
			apiUrl,
			{},
			headers
		)
		.then((response) => {
			console.log(response, "response");
			res.send(response.data);
		})
		.catch((error) => {
			console.log(error.message, "error");
		});
});

app.post('/api/login',(req,res)=> {
	const {email_id, password} = req.body;
	const encrytPassword = crypto.createHash('md5').update(password).digest('hex');
	connection.query("SELECT * FROM user WHERE email = '" + email_id + "' AND password = '" + encrytPassword + "'", function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.post('/api/createFrame', cpUpload, function (req, res, next) {
	const{name,code,description,category,url}= req.body
	const {image1,image2,image3,image4} = req.files;
	console.log(image1,'filesss');

	connection.query(
		"INSERT INTO Frame (Frame_Code, Frame_Name, Frame_Description, Frame_Image_1, Frame_Image_2, Frame_Image_3,Frame_Image_4, Frame_External_Link,Frame_Category) VALUES ('"+code+"', '"+name+"', '"+description+"','"+url+"','"+image1[0].filename+"','"+image2[0].filename+"','"+image3[0].filename+"','"+image4[0].filename+"','"+category+"')", 
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.post('/api/editFrame/:id', cpUpload, function (req, res, next) {
	const{name,code,description,category,url}= req.body
	const {image1,image2,image3,image4} = req.files;
	console.log(req.params.id,'id');
	let query = `Update Frame SET Frame_Code='${code}',Frame_Name='${name}',Frame_Category='${category}',Frame_Description='${description}',Frame_External_Link='${url}'`
	console.log(image1,'filesss');
	query = image1 ? query+`, Frame_Image_1='${image1[0].filename}'` : query;
	query = image2 ? query+`, Frame_Image_2='${image2[0].filename}'` : query;
	query = image3 ? query+`, Frame_Image_3='${image3[0].filename}'` : query;
	query = image4 ? query+`, Frame_Image_4='${image4[0].filename}'` : query;
	query = query+` where Frame_Code='${req.params.id}'`;
	console.log(query);
	connection.query(
		query,
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.post('/api/deleteFrame', (req,res)=>{
	const{code} = req.body;
	connection.query(
		"Delete from Frame where Frame_Code='"+code+"'", 
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.get('/api/getFrameCategory', (req, res) => {
	connection.query("SELECT * from Frame_Category", function (error, results, fields) {
		if (error) throw error;
		console.log(results, "results");
		res.send(results);
	});
})

app.post('/api/getFrameCategoryById', (req, res) => {
	const {categoryId} = req.body;
	connection.query("SELECT * from Frame_Category Where id = '"+categoryId+"'", function (error, results, fields) {
		if (error) throw error;
		console.log(results, "results");
		res.send(results);
	});
})

app.post('/api/createFrameCategory', function (req, res, next) {
	const{category}= req.body

	connection.query(
		"INSERT INTO Frame_Category (Category) VALUES ('"+category+"')", 
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.post('/api/editFrameCategory/:id', cpUpload, function (req, res, next) {
	const{category}= req.body
	console.log(req.params.id,'id');
	let query = `Update Frame_Category SET Category='${category}' where id='${req.params.id}'`;
	console.log(query);
	connection.query(
		query,
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.post('/api/deleteFrameCategory', (req,res)=>{
	const{categoryId} = req.body;
	connection.query(
		"Delete from Frame_Category where id='"+categoryId+"'", 
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.listen(3001, () => {
	console.log("Express server is running on localhost:3001");
});
