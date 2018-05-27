//initial
//var fs = require('fs')
http = require('http'),
    https = require('https'),
    express = require('express');

//var options = {
//    key: fs.readFileSync('./ssl/private.key'),
//    cert: fs.readFileSync('./ssl/certificate.crt'),
//};
var app = express(); //移過來的
//var multer = require('multer');
//var moment = require('moment');
//var bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//const app = express()//我移到前面宣告
const port = 41781

// mongo 
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://wp2017_groupi:vic32823@luffy.ee.ncku.edu.tw:27017/wp2017_groupi";

// Express Router

// 建立 Router 物件
//var router = express.Router();

// create ssh server
// var server = https.createServer(options, app).listen(port, function() {
//     console.log(`Listening on port ${port}`)
//     app.use(express.static(__dirname + '/public'))
// });
