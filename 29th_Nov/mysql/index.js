const express = require('express');
const app=express();
var mysql = require("mysql");
const bodyParser=require("body-parser")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"hello"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/",(req,res) => {
    res.render("index");
});

app.post("/push_data",(req,res)=>{
    var data=req.body.push;
    // console.log(data);
    var sql = "INSERT INTO save (sl_no, Name) VALUES ?";
    var values = [[ ,data]];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("1 Record inserted");
    });
});

app.listen(3000);
