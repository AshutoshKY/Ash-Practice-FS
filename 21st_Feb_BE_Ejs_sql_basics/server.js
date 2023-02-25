const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const store = new session.MemoryStore();
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const urlcoded = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

// var time = [[]];

// setTimeout(() => {
//     const liveReloadServer = livereload.createServer();
//     liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 500);
//     });
// })

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, time);
// });

app.use(connectLiveReload());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "beBasics"
}
);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected with Database-MySql");
});

app.use(session({
    cookieName: 'session',
    secret: 'hakunamatata',
    cookie: {
        secure: false,
        maxAge: 6000
    },
    resave: true,
    saveUninitialized: true,
    secure: true,
    store
}))

// con.connect(function(err) {
//     con.query("SELECT * FROM userInfo", function (err, result) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

app.get('/data', (req, res) => {
    con.query('SELECT * FROM userInfo', function (err, result) {
        if (err) throw err;
        res.render('data', { data: result });
    })
})

app.get("/", (req, res) => {
    res.render("home");
    // console.log("Session ID is -", req.sessionID);
})

app.get('/sample', (req, res) => {
    res.render("sample");
})

app.get("/login", (req, res) => {
    res.render("login", { loginexpired: ' ' });
    // console.log("Session ID is -", req.sessionID);
    // console.log("Session User is -", req.session.user);
    // console.log("Session Store - ", store);
})

app.get("/loginsuccess", (req, res) => {
    // res.render("loginsuccess");

    if (req.session.user && req.session) {
        var namy = req.session.user;
        var exp = req.session.cookie.maxAge/1000;
        const liveReloadServer = livereload.createServer();
        res.render('loginsuccess', { username: namy, exp: exp});
        liveReloadServer.server.once("connection", () => {
            setTimeout(() => {
                console.log('refreshed');
                liveReloadServer.refresh("/");
                console.log('refreshed after');
            }, req.session.cookie.maxAge+100);
        })
    }
    else {
        console.log('Login Expired!!');
        res.render('login', { loginexpired: 'Login Expired' });
    }

    // setTimeout(()=> {
    //     history.go(-1);
    // },req.session.cookie.maxAge);
})

app.get("/register", (req, res) => {
    res.render("register", { userRegistered: ' ', userNotRegistered: ' ' });
})

app.post("/login", urlcoded, (req, res) => {
    var email = req.body.emailID;
    var pass = req.body.password;
    var exp = req.body.exp;

    con.query('SELECT * FROM userInfo WHERE email = ?', [email], function (err, results) {
        if (err) {
            console.log("Login Error");
            res.render('error404', { passwordIncorrect: ' ', userNotRegistered: ' Unknown Error ', });
        }
        if (results.length > 0) {
            if (results[0].password == pass) {
                var userlgin = { email: results[0].email, name: results[0].name };
                req.session.user = userlgin;
                console.log("Login Successful of ->", req.session.user, "Session ID is -", req.sessionID);
                console.log("Session User is -", req.session.user);
                console.log("Session Store - ", store);
                req.session.cookie.maxAge = Number(exp);
                res.redirect('/loginsuccess');
                // res.json(req.session);
            } else {
                console.log("Password Incorrect");
                res.render('error404', { passwordIncorrect: 'Password Incorrect', userNotRegistered: ' ', });
            }
        } else {
            console.log("Email Doesn't exist");
            res.render('error404', { userNotRegistered: 'User Not Registered', passwordIncorrect: ' ' });
        }
    })
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

app.post("/register", urlcoded, (req, res) => {
    var email = req.body.emailres;
    var name = req.body.name;
    var password = req.body.passres;

    con.query('SELECT * FROM userInfo WHERE email = ?', [email], function (err, results) {
        if (err) throw err;

        else {
            if (results.length > 0) {
                console.log("User Already Registered");
                res.render("register", { userRegistered: ' ', userNotRegistered: ' User Already Exists' });
            } else {
                var sql = "INSERT INTO userInfo (id, name, email, password) VALUES ?";
                var vals = [[, name, email, password]];
                con.query(sql, [vals], function (err, result) {
                    if (err) throw err;
                    console.log("New User '" + name + "' is Registered succesfully" + result.affectedRows);
                    res.render("register", { userRegistered: ' You are Registered ', userNotRegistered: ' ' });
                })
            }
        }
    })
});

app.get("/delete/:id", urlcoded, (req, res) => {
    var id = req.params.id;
    var sql = `DELETE FROM userInfo WHERE id = "${id}"`;

    con.query(sql, function (err, results) {
        if (err) throw err;
        else {
            console.log(results.affectedRows);
            res.redirect('/data');
        }
    });
})

app.listen(5000, function (err) {
    if (err) throw err;
    console.log("Server Started");
});

