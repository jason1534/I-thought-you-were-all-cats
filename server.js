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

//mysql
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

//check user system
app.get('/check_data',function(req, res){
  var id = req.param('id') ;
  console.log(id);
  var nicknm = req.param('NICKNAME');
  var chapter = req.param('chapter');
  var sql ="SELECT id,nickname,chapter FROM `uidd2018_groupN`.`midterm` WHERE id='"+id+"';"
 
  console.log(sql)
  con.query(sql,function(err,result){
   if (err) throw err;
    console.log("start check");
//    console.log(result);
    if(result.length!=0){
    res.send(result[0].nickname+" "+result[0].chapter)}
    else{
    res.send("0")}
    
  } );
});

//login system
app.get('/login_data',function(req, res){
  var id = req.param('id') ;
  var nm = req.param('name');
  var nicknm = req.param('NICKNAME');
  var sql ="INSERT INTO `uidd2018_groupN`.`midterm` (`id`,`name`, `nickname`,`chapter`,`item1`) VALUES ('"+id+"','"+nm+"','"+nicknm+"','0','1')";
  console.log(sql)
  con.query(sql,function(err,result){
   if (err) throw err;
    console.log("signup");
    res.send(`Welcome! Little ${req.query.NICKNAME} `)
  } );
});

//save chapter
app.get('/chapter_data',function(req, res){
  var id = req.param('id') ; 
  var chapter = req.param('chapter');
  var sql ="UPDATE `uidd2018_groupN`.`midterm` SET `chapter`='"+chapter+"' WHERE `id`='"+id+"'";
  console.log(sql)
  con.query(sql,function(err,result){
   if (err) throw err;
    console.log("save chapter"+chapter);
  } );
});

//save item
app.get('/thing_data',function(req, res){
  var id = req.param('id') ; 
  var thing_number = req.param('bag_thing');
  var sql ="UPDATE `uidd2018_groupN`.`midterm` SET `"+thing_number+"`='1' WHERE `id`='"+id+"'";
  console.log(sql)
  con.query(sql,function(err,result){
   if (err) throw err;
    console.log("save"+thing_number);
  } );
});

//get bag data
app.get('/get_thing_data',function(req, res){
  var id = req.param('id') ;
  console.log(id);
  var sql ="SELECT id,history1,history2,history3,history4,history5,item1,item2,item3,item4,item5,item6,item7,item8,item9,item10,item11,item12,item13,item14,item15,item16 FROM `uidd2018_groupN`.`midterm` WHERE id='"+id+"';"
 
  console.log(sql)
  con.query(sql,function(err,result){
   if (err) throw err;
    console.log("get bag data");
//    console.log(result);
    if(result.length!=0){
    res.send(result)};
  } );
});
