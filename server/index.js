const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pino = require('express-pino-logger')();
var cors = require('cors')
const dotenv = require('dotenv');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'clovenut'
});
connection.connect();

const app = express();
app.use(pino);
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_PASSWORD = process.env.API_PASSWORD;
const SIMULARTKEY = process.env.STIMULART_API_SECRET;
const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.API_PASSWORD,
}
app.post('/api/product', (req, res) => {
  console.log('heress');
  const { productImage, price } = req.body.product;
  axios.post(`https://${API_KEY}:${API_PASSWORD}@clovenut.myshopify.com/admin/api/2021-07/products.json`, {
    "product": {
      "title": "Burton Custom Freestyle 151a",
      "body_html": "<strong>Good snowboard!</strong>",
      "vendor": "Burtona",
      "product_type": "Snowboarda",
      "variants": [
        {
          "price": price,
          "fulfillment_service": "manual",
        }
      ],
      "images": [
        {
          "attachment": productImage
        }
      ],
      "metafields": [
        {
          "key": "new",
          "value": "newvalue",
          "value_type": "string",
          "namespace": "global"
        }
      ]
    }
  }, headers)
    .then(response => {
      console.log(response, 'responseid');
      axios.put(`https://${API_KEY}:${API_PASSWORD}@clovenut.myshopify.com/admin/api/2021-07/product_listings/${response.data.product.id}.json`, {
        "product_listing": {
          "product_id": response.data.product.id
        }
      }, headers)
        .then(response => {
          console.log(response, 'response')
          res.setHeader('Content-Type', 'application/json');
          res.send(response.data);
        })
    })
    .catch(error => {
      console.log(error.message, 'error')
    })
});

app.get('/api/getProduct/:id', (req, res) => {
  const { productImage } = req.body.product;
  axios.get(`https://${API_KEY}:${API_PASSWORD}@clovenut.myshopify.com/admin/api/2021-07/products/${req.params.id}.json`, {}, headers)
    .then(response => {
      console.log(response, 'response')
      res.setHeader('Content-Type', 'application/json');
      res.send(response.data);
    })
    .catch(error => {
      console.log(error.message, 'error')
    })
});

app.get('/api/getFrames', (req, res) => {
  connection.query('SELECT * from Frame', function (error, results, fields) {
    if (error) throw error;
    console.log(results, 'results');
    res.send(results)
  });
})

app.post('/api/buildImage', (req, res) => {
  const { m1, aw, ah, iw, ih, imgUrl } = req.body;
  axios.get(`https://apieu.simulartstudio.com/apiglobv6.php?key=${SIMULARTKEY}&uniqueId=${m1}&m1=${m1}&aw=300&ah=300&iw=${iw}&ih=${ih}&imgUrl=&imgUrl=${imgUrl}`, {}, headers)
    .then(response => {
      console.log(response, 'response')
      res.send(response.data);
    })
    .catch(error => {
      console.log(error.message, 'error')
    })
})

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001')
}
);