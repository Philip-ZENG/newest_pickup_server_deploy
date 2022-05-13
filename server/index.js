const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const auth = require("./auth");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
// app.use(cookieParser);
app.use(bodyParser.json());

// Connecting to the local mySQL server
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "qweasdzxc",
//   database: "project1",
// });

// Connecting to the AWS RDS mySQL server
var connection = mysql.createConnection({
  host: "database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "qweasdzxc",
  database: "project",
});

var person = {
  email:null,
  password:null
}

var rand,mailOptions,host,link;

// set the email service to the send emails to user's email
var smtpTransport = nodemailer.createTransport({
  service: "QQ",
  auth: {
      user: "2316293336@qq.com",
      pass: "tpqedtppgfcfebie"
  }
});

// Connet to mysql
connection.connect(function (err) {
  console.log("Connected to MySQL");
  if (err) throw err;
});

// Post route (Client post something to the server)
// This route is called when server receives something from the client
/**
 * @description 
 * * get the email and password from front end and send a email to the user
 */
app.post("/register", function (req, res) {
  console.log("able to step in");
  // Obtain the client side info with the help of body-parser package
  person.email = req.body.userAccount;
  person.password = req.body.password;

  // Insert the data into database, the syntax comes from the mysql.js package
  // * create a random verification code to verify
  rand=Math.floor((Math.random() * 100) + 54);
  host=req.get('host');
  console.log(host);
  link="http://"+req.get('host')+"/verify?id="+rand;

  // * set the target email
  mailOptions={
      from: "2316293336@qq.com",
      to : person.email,
      subject : "Please confirm your Email account",
      html : "Hello,Please Click on the link to verify your email."+link+">Click here to verify" 
  }

  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
          console.log(error);
      res.end("error");
    }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
  console.log(person);
});

/**
 * @description 
 * * verify the verification code in the server is the same as the 
 * * verification code in the email
 * * if it is true, store the email and password into the data base
 */

app.get('/verify', function(req,res){

  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+host)){
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand)
      {
        console.log("email is verified");

        // encryptedPassword = bcrypt.hash(person.password, 10);
        // person.password = encryptedPassword;

        var q = "INSERT INTO user_info SET ?";
        connection.query(q, person, function (err, result) {
        if (err) throw err;
        });
        console.log(person.email);
        console.log(person.password);

        // const token = jwt.sign(person.email, jwtKey, {
        //   algorithm: "HS256",
        //   expiresIn: "2h",
        // });
        
        // res.cookie("token", token, { maxAge: 1000*60*60 });
        res.redirect('http://localhost:8080/userHome');
        // console.log(token);
        // res.end("Email "+mailOptions.to+" is been Successfully verified");
      }
      else
      {
          console.log("email is not verified");
          res.end("Bad Request");
      }
  }
  else
    {
        res.end("Request is from unknown source");
    }
});

/**
 * @description 
 * * check the password from the front end 
 * * is the same as the password in the data base
 * * if it is true
 * @return
 * * the match result and the user_id
 */

function userLogin(email, password, callback) {
  connection.query({
    sql: 'SELECT * FROM `user_info` WHERE `email` = ?',
    values: [email]
  }, function(err, results) {
    console.log(results);
    if(results[0].password === password) {
      return callback({matched: true, user_id: results[0].user_id});
    }
    else{
      return callback({matched: false});
    }
  });
}


app.post('/userLogin', function(req,res){
  userLogin(req.body.userAccount, req.body.password, function(response) {
    if(response.matched) {
      res.json({userLoginSucceed: true, user_id: response.user_id});
    }
    else {
      res.json({userLoginSucceed: false});
    }
  })
});


/**
 * @description
 * Get the password data stored in database with provided admin_email
 */
function adminLogin(admin_email, admin_password, callback) {
  connection.query({
    sql: 'SELECT * FROM `admin_account` WHERE admin_email = ?',
    values: [admin_email]
  }, function(err, results) {
    console.log(results);
    if(results[0].admin_password === admin_password) {
      return callback({matched: true});
    }
    else{
      return callback({matched: false});
    }
  });
}

/**
 * @description
 * For the given email, Check whether the provided password matches that in the database
 */
app.post('/adminLogin', function(req,res){
  adminLogin(req.body.admin_email, req.body.admin_password, function(response) {
    if(response.matched) {
      res.json({adminLoginSucceed: true});
    }
    else {
      res.json({adminLoginSucceed: false});
    }
  })
});


const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`listening on ${port}`);
});