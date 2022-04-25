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
 * Get the list of activity_id of a user with given user_id
 * @param {*} callback 
 * Pass the activity_id list to next function
 * Callback is used to make sure data reading finishes before passing
 */
function get_activity_list(user_id,callback){
    connection.query({
    sql: 'SELECT * FROM `activity_user` WHERE `user_id` = ?',
    values: [user_id]
  }, function (err, results) {
    var activity_id_list = [];
    for(var i = 0; i < results.length; i++){
      activity_id_list.push(results[i].activity_id);
    }
    return callback(activity_id_list);
  });
}

/**
 * @description
 * Extract all the information of an activity with a given activity_id
 * @param {*} callback 
 * Callback is used to make sure data reading finishes before passing data
 */
function get_activity_info(activity_id,callback) {
  connection.query({
    sql: 'SELECT * FROM `activity_info` WHERE `activity_id` = ?',
    values: [activity_id]
  }, function (err, results) {
    // console.log(results[0]);
    return callback(results[0]);
  });
}

/**
 * @description
 * Pack all the activity info of a user into an array
 * @returns
 * Return the activity info in a packed array
 */
async function pack_activity_info(user_id){
  
  // Get the list of activity_id
  var myPromise1 = function(user_id){
    return new Promise(function(resolve){
      get_activity_list(user_id,(result)=>{
        resolve(result);
      });
    })
  }

  // Get all the information of activities of a user
  var myPromise2 = function(activity_id){
    return new Promise(function(resolve) {
      get_activity_info(activity_id,(data)=>{
        resolve(data);
      });
    })
  }

  // Response is the list containing all activity information pack
  var response = [];

  // Get activity list from Promise1
  const activity_id_list = await myPromise1(user_id);

  // Get activity data from Promise 2
  var activity_data = []; 
  for(var i = 0; i < activity_id_list.length; i++){
    const activityInfo = await myPromise2(activity_id_list[i]);
    activity_data.push(activityInfo);
  }
  response.push(activity_data);

  return response;
};

/**
 * @description
 * Get the role of a user in a specific activity with the provided activity_id and user_id
 */
function get_user_role(user_id, activity_id, callback) {
  connection.query({
    sql: 'SELECT role FROM `activity_user` WHERE `user_id` = ? AND `activity_id` = ?',
    values: [user_id, activity_id]
  }, function(err, results) {
    return callback(results[0]);
  });
}

/**
 * @description
 * Quit from an activity with provided activity_id and user_id
 * Delete the corresponding record in database
 */
function delete_member(user_id, activity_id, callback) {
  connection.query({
    sql: 'DELETE FROM `activity_user` WHERE `user_id` = ? AND `activity_id` = ?',
    values: [user_id, activity_id]
  }, function(err, results) {
    return callback();
  });
}

/**
 * @description
 * Update the role of a user with provided user_id
 */
function update_role(activity_id, user_id, new_role){
  connection.query({
    sql: 'UPDATE `activity_user` SET `role` = ? WHERE `activity_id` = ? AND `user_id` = ?',
    values: [new_role, activity_id, user_id]
  }, function(err, results) {
    console.log('Role Update { activity_id: ' + activity_id + ', user_id: ' + user_id + ', role: ' + new_role + '}');
  });
}

/**
 * @description
 * Transfer the authority of activity manager to other member with provided new_manager_id
 * Set the role of old_manager to 'MEMBER' and set the role of new_manager to 'MANAGER'
 */
function change_manager(activity_id, new_manager_id, old_manager_id) {
  update_role(activity_id,new_manager_id,'MANAGER');
  update_role(activity_id,old_manager_id,'MEMBER');
}

/**
 * @description
 * Terminate the whole activity with provided activity_id
 * Delete the activity_info record and delete all the activity_data record (delete all the members of the activity)
 * By adding ON DELETE CASCADE to foreign keys
 */
function terminate_activity(activity_id) {
  connection.query({
    sql: 'DELETE FROM `activity_info` WHERE `activity_id` = ?',
    values: [activity_id]
  },function(err, results) {
    console.log('Activity ID: ' + activity_id + ' has been Terminated');
  });
}

/**
 * @description
 * Get the member of an activity with provided activity_id
 */
function get_member_list(activity_id, callback){
  connection.query({
    sql: 'SELECT * FROM `activity_user` WHERE `activity_id` = ?',
    values: [activity_id]
  }, function(err, results) {
    var member_id_list = [];
    for(var i = 0; i < results.length; i++) {
      member_id_list.push(results[i].user_id);
    }
    return callback(member_id_list);
  });
}

/**
 * @description
 * Get the user info of a user with provided user_id
 */
function get_user_info(user_id, callback){
  connection.query({
    sql: 'SELECT * FROM `user_info` WHERE `user_id` = ?',
    values: [user_id]
  }, function (err, results) {
    // console.log(results[0]);
    return callback(results[0]);
  });
}

/**
 * @description
 * Pack all the user info of an activity
 */
async function pack_member_info(activity_id) {
  
  // Get the list of user_id
  var myPromise1 = function(activity_id){
    return new Promise(function(resolve){
      get_member_list(activity_id,(result)=>{
        resolve(result);
      });
    })
  }

  // Get all the information of a user
  var myPromise2 = function(user_id){
    return new Promise(function(resolve) {
      get_user_info(user_id,(data)=>{
        resolve(data);
      });
    })
  }

  // Get activity list from Promise1
  const member_id_list = await myPromise1(activity_id);

  // Get activity data from Promise 2
  var member_data = []; 
  for(var i = 0; i < member_id_list.length; i++){
    const memberInfo = await myPromise2(member_id_list[i]);
    member_data.push(memberInfo);
  }

  return member_data;
};

/**
 * @description
 * Return activity info of a specific activity with the provided activity_id
 */
app.post("/getActivityInfo", function(req, res){
  get_activity_info(req.body.activity_id, function(response) {
    res.json(response);
  })
});

/**
 * @description
 * Return the role of a user with the provided activity_id and user_id
 */
 app.post("/getUserRole", function(req, res){
  get_user_role(req.body.user_id, req.body.activity_id, function(response) {
    res.json(response);
  })
});

/**
 * @description
 * Quit from the activity with provided activity_id and user_id
 */
app.post('/deleteMember', function(req,res){
  delete_member(req.body.user_id, req.body.activity_id, function(response) {
    console.log('Delete user_id: ' + req.body.user_id.toString() + ' from activity_id: ' + req.body.activity_id.toString());
    res.json({succeed: true});
  })
});

/**
 * @description
 * Transfer the authority of activity manager to other member with provided new_manager_id
 */
app.post('/changeManager', function(req,res){
  change_manager(req.body.activity_id,req.body.new_manager_id, req.body.old_manager_id);
  console.log('Change manager: { activity_id: ' + req.body.activity_id + ' old_manager: ' + req.body.old_manager_id + ' new_manager: ' + req.body.new_manager_id + ' }');
  res.json({succeed: true});
});

/**
 * @description
 * Terminate the whole activity
 */
app.post('/terminateActivity', function(req,res){
  terminate_activity(req.body.activity_id);
  console.log('Terminate activity: activity_id: ' + req.body.activity_id);
  res.json({succeed: true});
});

/**
 * @description
 * Get the all the user info who has the take part in the activity with provided activity_id
 */
app.post('/getMemberInfo', function(req,res){
  pack_member_info(req.body.activity_id)
    .then(response => {
      res.json(response);
    })
    .catch(() => {
      console.log("error")
    });
});

/**
 * @description
 * Return activity info of a specific user to whom make the request
 */
app.post("/getActivityList", function (req, res) {
  pack_activity_info(req.body.user_id)
    .then(response => {
      res.json(response);
    })
    .catch(() => {
      console.log("error")
    });
});

const port = process.env.PORT || 4003;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
