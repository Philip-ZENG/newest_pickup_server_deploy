// include packages
const { faker } = require('@faker-js/faker');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "qweasdzxc",
    database: "pickup",
  });


// Connet to mysql
connection.connect(function(err) {
    if (err) throw err;
});

/// activity_user table
/////////////////////////////////////////
var data = [];
for(var i = 0; i < 4; i++){
    data.push([
        1,
        faker.random.number({ min: 9, max: 50}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 3; i++){
    data.push([
        2,
        faker.random.number({ min: 5, max: 50}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 2; i++){
    data.push([
        3,
        faker.random.number({ min: 1, max: 54}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 5; i++){
    data.push([
        4,
        faker.random.number({ min: 1, max: 22}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 8; i++){
    data.push([
        5,
        faker.random.number({ min: 12, max: 50}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 6; i++){
    data.push([
        7,
        faker.random.number({ min: 37, max: 50}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 4; i++){
    data.push([
        8,
        faker.random.number({ min: 25, max: 50}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 9; i++){
    data.push([
        9,
        faker.random.number({ min: 1, max: 30}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

////////////////////////////////
var data = [];
for(var i = 0; i < 5; i++){
    data.push([
        10,
        faker.random.number({ min: 1, max: 48}),
        'MEMBER'
    ]);
}
var q = 'INSERT INTO activity_user (activity_id,user_id,role) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});


// Disconnect from mysql
connection.end(function(err){
    if(err) throw err;
});