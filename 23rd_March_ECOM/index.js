const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

function generateUniqueId(username) {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 15);
  const uniqueId = `${username}${timestamp}${randomString}`;
  return uniqueId;
}

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'ecombe' /* MySQL Database */
});



conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.get("/login", function(req,res){
   res.render("login");
});

app.post('/auth', function(req, res) {
	let username = req.body.uname;
	let password = req.body.passwd;
	if (username && password) {
		conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				req.session.loggedin = true;
        req.session.username = username;
        results.forEach((result)=>{
          req.session.usrtyp=result.type;
        });
        if(req.session.usrtyp==1){
          res.redirect("/dashboard")
        }
        else {
          res.redirect("/");
        }
			} else {
				res.send('Incorrect Username and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
    res.end();
	}
});

app.get("/dashboard", function(req,res){
    if(req.session.loggedin && req.session.usrtyp){
      res.render("dashboard");
    }
    else{
      res.send("<h1>401</h1>")
    }

});
app.get("/addp",function(req,res){
  let sqlQuery = "SELECT * FROM types";


let query = conn.query(sqlQuery, (err, results) => {
  if(err) throw err;

  res.render("add_pro",{results});
});
});
app.post("/addp",function(req,res){

let data={name:req.body.name, des:req.body.des,price:req.body.price,sale_price:req.body.saleprice,type:req.body.category,image:'not config'}
let sqlQuery = "INSERT INTO products SET ?";

  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    else {
      res.redirect("/dashboard");
    }
  });
console.log(data);
});

app.get("/",function(req,res){

  let sqlQuery = "SELECT types.type,products.id,products.name,products.des,products.price,products.sale_price FROM `types` INNER JOIN products ON products.type = types.id";
    let query = conn.query(sqlQuery,(err, results) => {
      if(err) throw err;
      else {
        res.render("home",{results});
      }
    });
});

app.get("/details/:id",function(req,res){
  var id=req.params.id;
  let sqlQuery = "SELECT * from products where id="+id;
    let query = conn.query(sqlQuery,(err, results) => {
      if(err) throw err;
      else {
        res.render("product",{results});
      }
    });
});


app.get("/checkout/:id",function(req,res){
  var id=req.params.id;
res.render("checkout",{id})
});
app.post("/buy",function(req,res){


  if(req.session.loggedin){
    const uniqueId = generateUniqueId(req.session.username);
    let data = {p_id: req.body.p_id, usr_buy: req.session.username, o_id: uniqueId, addr: req.body.addr, tracking: 0, tracking_id: "Not Available", mode: req.body.mode};
    console.log(data);


    let sqlQuery = "INSERT INTO orders SET ?";

    let query = conn.query(sqlQuery, data,(err, results) => {
      if(err) throw err;
    });
    res.send("<H1>orderd</H1>")
  }
  else{
    res.redirect("/login")
  }
});


app.get("/view_order",function(req,res){

  if(req.session.loggedin){
    let sqlQuery = "SELECT orders.id,orders.p_id,orders.usr_buy,orders.o_id,orders.addr,orders.tracking ,orders.tracking_id,products.name,orders.mode FROM orders INNER JOIN products ON products.id = orders.p_id WHERE orders.usr_buy='"+req.session.username+"'";

let query = conn.query(sqlQuery, (err, results) => {
  if(err) throw err;
  res.render("view_orders_user", {results})
});


  }
  else{
    res.redirect("/login");
  }


});
app.get("/view_order_admin",function(req,res){

  if(req.session.loggedin && req.session.usrtyp){
    let sqlQuery = "SELECT orders.id,orders.p_id,orders.usr_buy,orders.o_id,orders.addr,orders.tracking ,orders.tracking_id,products.name,orders.mode FROM orders INNER JOIN products ON products.id = orders.p_id" ;

let query = conn.query(sqlQuery, (err, results) => {
  if(err) throw err;
  res.render("view_orders_admin", {results})
});


  }
  else{
    res.redirect("/login");
  }


});
app.get("/changestaAccept/:id",function(req,res){
	var id=req.params.id;
		let sqlQuery = "UPDATE orders SET tracking=1 WHERE id="+id;

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.redirect("/view_order_admin");
  });
	
});
app.get("/changestaDecline/:id",function(req,res){
	var id=req.params.id;
		let sqlQuery = "UPDATE orders SET tracking=4 WHERE id="+id;

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.redirect("/view_order_admin");
  });
	
});
app.get("/changestaDelivered/:id",function(req,res){
	var id=req.params.id;
		let sqlQuery = "UPDATE orders SET tracking=3 WHERE id="+id;

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.redirect("/view_order_admin");
  });
	
});
app.post("/addT_id",function(req,res){
		var id=req.body.oid;
		let sqlQuery = "UPDATE orders SET tracking=2,tracking_id='"+req.body.tid+"' WHERE id="+id;

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.redirect("/view_order_admin");
  });
	
});













app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
