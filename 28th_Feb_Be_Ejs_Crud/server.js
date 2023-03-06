const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();

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

app.use(session({
    cookieName: 'session',
    secret: 'hakunamatata',
    // cookie: {
    //     secure: false,
    //     maxAge: 6000000
    // },
    duration: 10*1000,
    resave: true,
    saveUninitialized: true,
    secure: true,
    store
}))

app.get('/', (req, res) => {
    con.query('SELECT * FROM twinfo ORDER BY id DESC', function (err, results) {
        if (err) throw err;
        console.log(results);
            res.render('home', { data:results ,log:false});
    })
})

app.get('/1', (req, res) => {
        con.query('SELECT * FROM twinfo ORDER BY id DESC', function (err, results) {
            if (err) throw err;
            console.log(results);
            if(req.session.user && req.session){
                res.render('home', { data:results, log:true });
            }else{
                res.redirect('/');
            }
        })
})

app.get('/login', (req, res) => {
    res.render('login', { passwordIncorrect: ' ', userNotRegistered: ' ' });
})

app.post('/login', urlcoded, (req, res) => {
    var email = req.body.lemail;
    var pass = req.body.lpassword;

    con.query('SELECT * FROM userInfo WHERE email = ?', [email], function (err, results) {
        if (err) {
            console.log("Login Error");
            res.render('login', { passwordIncorrect: ' ', userNotRegistered: ' Unknown Error ', });
        }
        if (results.length > 0) {
            if (results[0].password == pass) {
                var userlgin = { email: results[0].email, name: results[0].name , likes:results[0].likes};
                req.session.user = userlgin;
                console.log("Login Successful of ->", req.session.user, "Session ID is -", req.sessionID);
                console.log("Session User is -", req.session.user);
                console.log("Session Store - ", store);
                // req.session.cookie.maxAge = Number(exp);
                res.redirect('/1');
                // res.json(req.session);
            } else {
                console.log("Password Incorrect");
                res.render('login', { passwordIncorrect: 'Password Incorrect', userNotRegistered: ' ' });
            }
        } else {
            console.log("Email Doesn't exist");
            res.render('login', { userNotRegistered: 'User Not Registered', passwordIncorrect: ' ' });
        }
    })

})

app.get('/register', (req,res) => {
    res.render('register', { userRegistered: ' ', userNotRegistered: ' ' });
});

app.post("/register", urlcoded, (req, res) => {
    var email = req.body.remail;
    var name = req.body.rname;
    var password = req.body.rpassword;
    var likes=0;

    con.query('SELECT * FROM userInfo WHERE email = ?', [email], function (err, results) {
        if (err) throw err;

        else {
            if (results.length > 0) {
                console.log("User Already Registered");
                res.render("register", { userRegistered: ' ', userNotRegistered: ' User Already Exists' });
            } else {
                var sql = "INSERT INTO userInfo (id, name, email, password, likes) VALUES ?";
                var vals = [[, name, email, password,likes]];
                con.query(sql, [vals], function (err, result) {
                    if (err) throw err;
                    console.log("New User '" + name + "' is Registered succesfully" + result.affectedRows);
                    res.render("register", { userRegistered: ' You are Registered ', userNotRegistered: ' ' });
                })
            }
        }
    })
});

app.get("/dashboard", (req, res) => {
    // res.render("loginsuccess");
    
    if (req.session.user && req.session) {
        var name = req.session.user.name;
    var namy = req.session.user;
        con.query('SELECT * FROM twInfo WHERE createdUser = ? ORDER BY id DESC',[name] ,function (err, results) {
            if (err) throw err;
            console.log(results);
            res.render('dashboard', {data:results, username:namy});
        })
    }
    else {
        console.log('Login Expired!!');
        res.render('login', { userNotRegistered: 'Login Expired' });
    }

    // setTimeout(()=> {
    //     history.go(-1);
    // },req.session.cookie.maxAge);
})

app.get('/tweetPost', (req, res) => {
    res.render('makeTweet', { tweet: ' ' , uname:req.session.user.name});
})

app.post('/tweetPost', urlcoded, (req, res) => {
    var title = req.body.title;
    var body = req.body.body; const date = Date();
    const new_date = new Date(date);
    const dates = new_date.getDate();
    const month = new_date.getMonth();
    const year = new_date.getFullYear();
    const hours = new_date.getHours();
    const minutes = new_date.getMinutes();
    // console.log(dates+ "/" +month+ "/" + year +" "+hours+":"+minutes);
    var timeSaved = dates + "/" + month + "/" + year + " " + hours + ":" + minutes;
    var createdUser = req.session.user.name;

    var sql = "INSERT INTO twinfo (id, title, body, timeSaved, createdUser) VALUES ?";
    var vals = [[, title, body, timeSaved, createdUser]];
    con.query(sql, [vals], function (err, result) {
        if (err) throw err;
        console.log("New Tweet '" + title + "' is Tweeted succesfully" + result.affectedRows);
        res.render("makeTweet", { tweet: 'Tweeted Succesfully' });
    })
})

app.get('/tweet/:id', (req, res) => {
    var id = req.params.id;
    var sql = `SELECT * FROM twinfo WHERE id = "${id}"`;

    con.query(sql, function (err, results) {
        if (err) throw err;
        else {
            console.log("Opened Profile - ", results[0].id);
            res.render('parTweet', { results });
        }
    });
})

app.get('/tweetDelete/:id', urlcoded, (req, res) => {
    // var sql = "INSERT INTO twinfo (id, title, body, timeSaved, createdUser) VALUES ?";
    var id = req.params.id;
    var sql = `DELETE FROM twInfo WHERE id = "${id}"`;

    con.query(sql, function (err, results) {
        if (err) throw err;
        else {
            console.log(results.affectedRows);
            res.redirect('/dashboard');
        }
    });
})

app.post('/likes/:name', urlcoded ,(req,res) => {
    var namy = req.params.name;
    var sql = `UPDATE userInfo SET likes = likes+1 WHERE name ="${namy}"`;
    con.query(sql, [namy] ,function (err, results) {
        if (err) throw err;
        console.log("Profile Liked - ", namy);
        // res.render('p', { results });
    });
})

app.get('/logout', (req, res) => {
    // const time = req.session.duration;
    // setTimeout(() => {
    console.log("Session ID is -", req.sessionID);

    req.session.destroy((err) => {
        if (err) throw err;
        // console.log("Session ID is -", req.sessionID);
        console.log("Session destroyed");
        // console.log("Session ID is -", req.sessionID);
        res.redirect('/login');
        console.log("Logout Success");
        // console.log("Session ID is -", req.sessionID);
    })
    console.log("Session ID is -", req.sessionID);

    // }, time);
})


app.listen(7000, function (err) {
    if (err) throw err;
    console.log("Server Started");
});
