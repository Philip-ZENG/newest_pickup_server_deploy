const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");
const { func } = require("joi");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({});

app.use(morgan("tiny"));
app.use(cors());
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

// Connet to mysql
connection.connect(function (err) {
  if (err) throw err;
  console.log('mySQL server connection succeed.')
});


app.post("/upload", upload.single("image"), async (req,res)=>{
  const {buffer, mimetype, encoding, originalname, fieldname, size} = req.file;
  const extName = mimetype.split("/")[1];
  const ext = req.file.mimetype.split("/")[1];
  const profilePath = path.join(__dirname, "./public/img/" + req.body.user_id + "." + ext)
  fs.writeFile(profilePath, buffer, (err) => {
    if(err){
      console.log(err);
    } else {
      const base64 = fs.readFileSync(profilePath, 'base64') // 文件流并转 base64
      res.send(base64);
    }
  })
})

/**
 * @description 
 * * get the profile and send the base64 foramt picture
 */

app.post("/getProfile", (req, res) => {
  const profilePath = path.join(__dirname, "./public/img/" + req.body.user_id + ".png")
  fs.exists(profilePath, function(exists) {
    if(exists){
      const base64 = fs.readFileSync(profilePath, 'base64') // 文件流并转 base64
      res.send(base64);
    } else {
      const defaultPath = path.join(__dirname, "./public/img/" + "default.png");
      const base64 = fs.readFileSync(defaultPath, 'base64') // 文件流并转 base64
      res.send(base64);
    }
  })
  // const base64 = fs.readFileSync(profilePath, 'base64') // 文件流并转 base64
  // res.send(base64);
})

/**
 * @description 
 * * get the user information from the database
 * * send the result
 */

function getUserInfo(user_id, callback) {
    connection.query({
      sql: 'SELECT * FROM `user_info` WHERE `user_id` = ?',
      values: [user_id]
    }, function (err, results) {
      console.log(results);
      return callback(results[0]);
    });
  }

app.post('/getUserInfo', function(req,res) {
    getUserInfo(req.body.user_id, function(response) {
        res.json(response);
    })
});

app.post('/setting/password', function(req, res) {
    var password = req.body.password;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `password` = ? WHERE `user_id` = ?',
        values: [password, user_id]
        }, function(err, results){
        console.log('Password Update { user_id: ' + user_id + ', new_password: ' + password + '}');
        res.json({succeed: true});
    });
})

app.post('/setting/name', function(req, res) {
    var userName = req.body.userName;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `user_name` = ? WHERE `user_id` = ?',
        values: [userName, user_id]
        }, function(err, results){
        console.log('User Name Update { user_id: ' + user_id + ', new_user_name: ' + userName + '}');
        res.json({succeed: true});
    });
})

app.post('/setting/contact', function(req, res) {
    var contact = req.body.contact;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `contact_info` = ? WHERE `user_id` = ?',
        values: [contact, user_id]
        }, function(err, results){
        console.log('Contact Update { user_id: ' + user_id + ', new_contact: ' + contact + '}');
        res.json({succeed: true});
    });
})

app.post('/setting/gender', function(req, res) {
    var gender = req.body.gender;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `gender` = ? WHERE `user_id` = ?',
        values: [gender, user_id]
        }, function(err, results){
        console.log('Gender Update { user_id: ' + user_id + ', gender: ' + gender + '}');
        res.json({succeed: true});
    });
})

app.post('/setting/bio', function(req, res) {
    var Bio = req.body.Bio;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `personal_intro` = ? WHERE `user_id` = ?',
        values: [Bio, user_id]
        }, function(err, results){
        console.log('Bio Update { user_id: ' + user_id + ', new_Bio: ' + Bio + '}');
        res.json({succeed: true});
    });
})

const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});