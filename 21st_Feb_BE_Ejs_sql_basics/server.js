const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const urlcoded = bodyParser.urlencoded({extended:false});

app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"beBasics"
    }
);

con.connect(function(err){
    if(err) throw err;
    console.log("Connected with Database-MySql");
});

app.use(session({
    cookieName: 'session',
    secret: 'hakunamatata',
    duration:  10 * 1000,
    activeDuration: 10 * 1000,
    resave: true,
    saveUninitialized: true
}))

// con.connect(function(err) {
//     con.query("SELECT * FROM userInfo", function (err, result) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

app.get('/data', (req,res) => {
    con.query('SELECT * FROM userInfo', function(err, result){
        if(err) throw err;
        res.render('data', {data:result});
    })
})

app.get("/", (req,res) => {
    res.render("home");
})

app.get("/login", (req,res) => {
    res.render("login");
})

app.get("/loginsuccess", (req,res) => {
    // res.render("loginsuccess");

    if(req.session.user&&req.session){
            var namy=req.session.user;
            res.render( 'loginsuccess', {username: namy});
	}
	else{
		console.log('Login again!!');
		res.render('login');
	}
})

app.get("/register", (req,res) => {
    res.render("register", {userRegistered:' ', userNotRegistered: ' '});
})

app.post("/login", urlcoded ,(req,res) => {
    var email=req.body.emailID;
    var pass=req.body.password;

    con.query('SELECT * FROM userInfo WHERE email = ?',[email],function(err, results){
        if(err){
			console.log("Login Error");
			res.render('error404',  {passwordIncorrect:' ', userNotRegistered: ' Unknown Error ',});
		}
        if(results.length > 0){
            if(results[0].password==pass){
                var userlgin = {email:results[0].email, name:results[0].name};
                req.session.user=userlgin;
                console.log("Login Successful of ->", req.session.user);
                res.redirect('/loginsuccess');
            }else{
                console.log("Password Incorrect");
                res.render('error404', {passwordIncorrect:'Password Incorrect', userNotRegistered: ' ',});
            }
        }else{
            console.log("Email Doesn't exist");
				res.render( 'error404', { userNotRegistered: 'User Not Registered', passwordIncorrect: ' '});
        }
    })
})

app.get('/logout', (req,res) => {
    // const time = req.session.duration;
    // setTimeout(() => {
    req.session.destroy((err) => {
        if(err) throw err;
        console.log("Session destroyed");
        res.redirect('/login');
        console.log("Logout Success");
    })
    // }, time);
})

app.post("/register", urlcoded ,(req,res) => {
    var email = req.body.emailres;
    var name  = req.body.name;
    var password = req.body.passres;

    con.query('SELECT * FROM userInfo WHERE email = ?',[email],function(err, results)
	{
        if(err) throw err;
		
        else{
			if(results.length > 0){
				console.log("User Already Registered");
				res.render("register", {userRegistered:' ', userNotRegistered: ' User Already Exists'});
			}else{
                var sql = "INSERT INTO userInfo (id, name, email, password) VALUES ?";
                var vals = [[,name, email, password]];
                con.query(sql, [vals], function(err, result){
                    if(err) throw err;
                    console.log("New User '"+name+"' is Registered succesfully"+ result.affectedRows);
                    res.render("register", {userRegistered:' You are Registered ', userNotRegistered: ' '});
                })
            }
        }
    })
});

app.get("/delete/:id", urlcoded, (req,res) => {
    var id = req.params.id;
    var sql = `DELETE FROM userInfo WHERE id = "${id}"`;

    con.query(sql, function(err,results){
        if(err) throw err;
        else
        {
            console.log(results.affectedRows);
            res.redirect('/data');
        }
    });	
})

app.listen(5000, function(err){
    if(err) throw err;
    console.log("Server Started");
});

