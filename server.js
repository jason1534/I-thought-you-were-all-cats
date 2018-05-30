//initial
//var fs = require('fs')
//http = require('http'),
var https = require('https'),fs = require("fs");
//    express = require('express');
var options = {
    key: fs.readFileSync('./ssl/private.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
};
//var options = {
//    key: fs.readFileSync('./privatekey.pem'),
//    cert: fs.readFileSync('./certification.pem'),
//};
const express = require(`express`)
var app = express(); //移過來的

app.use(express.static(__dirname + '/public'));
//const app = express()//我移到前面宣告
const port = 10132

// create ssh server
https.createServer(options, app).listen(port, function() {
    console.log(`Listening on port ${port}`)
    app.use(express.static(__dirname + '/public'))
});
//app.listen(port,() =>{
//    console.log(`Listening on port ${port}`)
//})
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "uidd2018_groupN",
  password: "catteam"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });

//login system
app.get('/login_data',function(req, res){
  var id = req.param('id') ;
  var nm = req.param('name');
  var nicknm = req.param('NICKNAME');
  var sql ="INSERT INTO `uidd2018_groupN`.`midterm` (`id`,`name`, `nickname`) VALUES ('"+id+"','"+nm+"','"+nicknm+"')";
  console.log(sql)
  con.query(sql,function(err,result){
   if (err) throw err;
    console.log("signup");
    res.send(`Welcome! Little ${req.query.NICKNAME} `)
  } );
});
