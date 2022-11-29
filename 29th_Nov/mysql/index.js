const express = require('express');
const app=express();
var mysql = require("mysql");
const bodyParser=require("body-parser")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/views'));

//Connect MySql Database by crating a variable con which
//has databse name and other metadata
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"hello"
});

// Shows if database with specified name is Conneted ot not
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Console Logs * from table specified in query
con.connect(function(err) {
    con.query("SELECT * FROM saved", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

// Render index.js at "localhost:3000/"
app.get("/",(req,res) => {
    res.render("index");
});

//Render and shows all Data from Specified table using data.ejs
app.get('/data', function(req, res) {
    con.query('SELECT * FROM saved', function (err, result) {
      if (err) throw err;

      res.render('data', {data: result});
    });
  });

//Connexts with a form to push Data ot Specified table using
//insert query and console log result
app.post("/push_data",(req,res)=>{
    var Name=req.body.push1;
    var Roll_No=req.body.push2;
    var Marks=req.body.push2;
    // var data=req.body.push;
    // console.log(data);
    var sql = "INSERT INTO saved (sl_no, Name, Roll_No, Marks) VALUES ?";
    var values = [[ ,Name,Roll_No,Marks]];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Record inserted "+ result.affectedRows);
    });
});

app.listen(3000);
