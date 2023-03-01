const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

const urlcoded = bodyParser.urlencoded({ extended: false });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sasta_tw"
}
);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected with Database-MySql");
});

app.get('/', (req,res) => {
    con.query('SELECT * FROM twinfo', function (err, results) {
        if(err) throw err;
        console.log(results);
        res.render('home', {data:results});
    })
})

app.get('/tweetPost', (req,res) => {
    res.render('makeTweet', {tweet:' '});
})

app.post('/tweetPost', urlcoded, (req,res) => {
    var title = req.body.title;
    var body = req.body.body;
    var timeSaved = 0;
    var createdUser = req.body.createduser;

    var sql = "INSERT INTO twinfo (id, title, body, timeSaved, createdUser) VALUES ?";
    var vals = [[, title,body,timeSaved,createdUser]];
    con.query(sql, [vals], function (err, result) {
        if (err) throw err;
        console.log("New Tweet '" + title + "' is Tweeted succesfully" + result.affectedRows);
        res.render("makeTweet", {tweet:'Tweeted Succesfully'});
    })
})

app.get('/tweet/:id', (req,res) => {
    var id = req.params.id;
    var sql = `SELECT * FROM twinfo WHERE id = "${id}"`;

    con.query(sql, function (err, results) {
        if (err) throw err;
        else {
            console.log("Opened Profile - ", results[0].id);
            res.render('parTweet', {results});
        }
    });
})

app.delete('/tweetDelete/:id', urlcoded, (req, res) => {
    var sql = "INSERT INTO twinfo (id, title, body, timeSaved, createdUser) VALUES ?";0
})


app.listen(7000, function (err) {
    if (err) throw err;
    console.log("Server Started");
});
