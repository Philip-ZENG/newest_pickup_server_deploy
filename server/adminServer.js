const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");
const { func } = require("joi");

const app = express();

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

/**
 * @description
 * Get all the user info
 */
function getAllUserInfo(callback) {
  connection.query('SELECT * FROM `user_info`', function (err, results) {
    console.log(results);
    var user_info = [];
    for(var i = 0; i < results.length; i++) {
      user_info.push(results[i]);
    }
    return callback(user_info);
  });
}


/**
 * @description
 * Get all the admin info
 */
 function getAllAdminAccount(callback) {
  connection.query('SELECT * FROM `admin_account`', function (err, results) {
    console.log(results);
    var admin_account = [];
    for(var i = 0; i < results.length; i++) {
      admin_account.push(results[i]);
    }
    return callback(admin_account);
  });
}


/**
 * @description
 * Get user info of specific user with provided user_id
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


/**
 * @description
 * Get admin account data of specific admin account with provided admin_id
 */
 function getAdminData(admin_id, callback) {
  connection.query({
    sql: 'SELECT * FROM `admin_account` WHERE `admin_id` = ?',
    values: [admin_id]
  }, function (err, results) {
    console.log(results);
    return callback(results[0]);
  });
}



/**
 * @description
 * Set a new password for a specific user with proviede user_id and new_password
 */
function setNewPassword(user_id, new_password, callback) {
  connection.query({
    sql: 'UPDATE `user_info` SET `password` = ? WHERE `user_id` = ?',
    values: [new_password, user_id]
  }, function(err, results){
    console.log('Password Update { user_id: ' + user_id + ', new_password: ' + new_password + '}');
    return callback({succeed: true});
  });
}


/**
 * @description
 * Set a new password for a specific admin account with proviede admin_id and new_admin_password
 */
 function setNewAdminPassword(admin_id, new_admin_password, callback) {
  connection.query({
    sql: 'UPDATE `admin_account` SET `admin_password` = ? WHERE `admin_id` = ?',
    values: [new_admin_password, admin_id]
  }, function(err, results){
    console.log('Password Update { admin_id: ' + admin_id + ', new_password: ' + new_admin_password + '}');
    return callback({succeed: true});
  });
}


/**
 * @description
 * Delete user account
 */
function deleteUser(user_id, callback) {
  connection.query({
    sql: 'DELETE FROM `user_info` WHERE `user_id` = ?',
    values: [user_id]
  }, function(err, results){
    console.log('Delete User { user_id: ' + user_id + '}');
    return callback({succeed: true});
  });
}

/**
 * @description
 * Delete admin account
 */
function deleteAdmin(admin_id, callback) {
  connection.query({
    sql: 'DELETE FROM `admin_account` WHERE `admin_id` = ?',
    values: [admin_id]
  }, function(err, results){
    console.log('Delete Admin Account { admin_id: ' + admin_id + '}');
    return callback({succeed: true});
  });
}

/**
 * @description
 * Create new admin account
 */
function createNewAdminAccount(admin_email, admin_password, callback) {
  const adminAccount = { admin_email: admin_email, admin_password: admin_password};
  connection.query('INSERT INTO admin_account SET ?', adminAccount, function(err, results) {
    console.log('Create New Admin Account { admin_email : ' + admin_email + ' , admin_password : ' + admin_password + ' }');
    return callback({succeed: true});
  })
}


/**
 * @description
 * Get all the user info and send it to client
 */
app.get('/getAllUserInfo', function(req,res){
  getAllUserInfo(function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Get all the admin account and send it to client
 */
 app.get('/getAllAdminAccount', function(req,res){
  getAllAdminAccount(function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Get user info of specific user with provided user_id and send it to client
 */
app.post('/getUserInfo', function(req,res) {
  getUserInfo(req.body.user_id, function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Get admin account data of specific admin account with provided admin_id and send it to client
 */
 app.post('/getAdminData', function(req,res) {
  getAdminData(req.body.admin_id, function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Set a new password for a specific user with proviede user_id and new_password
 */
app.post('/setNewPassword', function(req,res) {
  setNewPassword(req.body.user_id, req.body.new_password, function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Set a new password for a specific admin account with proviede admin_id and new_admin_password
 */
 app.post('/setNewAdminPassword', function(req,res) {
  setNewAdminPassword(req.body.admin_id, req.body.new_admin_password, function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Delete user account
 */
app.post('/deleteUser', function(req,res) {
  deleteUser(req.body.user_id, function(response) {
    res.json(response);
  })
});

/**
 * @description
 * Create new admin account
 */
 app.post('/deleteAdmin', function(req,res) {
  deleteAdmin(req.body.admin_id, function(response) {
    res.json(response);
  })
});


/**
 * @description
 * Delete admin account
 */
 app.post('/createNewAdminAccount', function(req,res) {
  createNewAdminAccount(req.body.admin_email, req.body.admin_password, function(response) {
    res.json(response);
  })
});


const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
