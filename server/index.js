const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const pino = require("express-pino-logger")();
var cors = require("cors");
const dotenv = require("dotenv");
var mysql = require("mysql");
dotenv.config();
var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: "clovenut",
});
connection.connect();

const app = express();
const crypto = require('crypto');
app.use(pino);
app.use(cors());
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
	const { productImage, price, title, body_html, vendor, product_type } = req.body.product;
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
						},
					],
					images: [
						{
							attachment: productImage,
						},
					],
					metafields: [
						{
							key: "new",
							value: "newvalue",
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

app.get('/api/getDefaultFrame', (req, res) => {
	connection.query("SELECT Frame_Code from Frame Where Frame_Code = 'MOUL001'", function (error, results, fields) {
		if (error) throw error;
		console.log(results, "results");
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

app.post("/api/buildImage", (req, res) => {
	const { m1, aw, ah, iw, ih, imgUrl, p1, pphf } = req.body;
	axios
		.get(
			`https://apieu.simulartstudio.com/apiglobv6.php?key=${SIMULARTKEY}&uniqueId=${m1}&m1=${m1}&aw=1200&ah=1200&iw=${iw}&ih=${ih}&p1=${p1}&pphf=${pphf}&imgUrl=&imgUrl=${imgUrl}`,
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
	const{name,code,description,url}= req.body
	const {image1,image2,image3,image4} = req.files;
	console.log(image1,'filesss');

	connection.query(
		"INSERT INTO frame (Frame_Code, Frame_Name, Frame_Description, Frame_Image_1, Frame_Image_2, Frame_Image_3,Frame_Image_4, Frame_External_Link,Frame_Category) VALUES ('"+code+"', '"+name+"', '"+description+"','"+url+"','"+image1[0].filename+"','"+image2[0].filename+"','"+image3[0].filename+"','"+image4[0].filename+"','1')", 
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.post('/api/deleteFrame', (req,res)=>{
	const{code} = req.body;
	connection.query(
		"Delete From frame where Frame_Code='"+code+"'", 
		function (error, results, fields) {
		if (error) throw error;
		res.statusCode = 200;
		res.send(results);
	});
})

app.listen(3001, () => {
	console.log("Express server is running on localhost:3001");
});
