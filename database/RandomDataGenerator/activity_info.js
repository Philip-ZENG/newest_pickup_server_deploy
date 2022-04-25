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

/////////////////////////////////////
// Generate 10 random information for activity_info table
var data = [];
var typelist = ['Sports','Meals','Travel','GroupShoping','Carpool'];
for(var i = 0; i < 10; i++){
    var type = typelist[faker.random.number({ min: 0, max: 4})];
    data.push([
        faker.random.words(),
        faker.date.past(),
        faker.address.cityName(),
        faker.random.words(20),
        faker.random.number({ min: 5, max: 10}),
        faker.random.number({ min: 0, max: 5}),
        type,
        faker.random.number({ min: 0, max: 100}),
    ]);
}
var q = 'INSERT INTO activity_info (title,time,location,description,max_capacity,quota_left,type,heat) VALUES ?';
connection.query(q, [data], function(err, result) {
    console.log(err);
    console.log(result);
  });


// Disconnect from mysql
connection.end(function(err){
    if(err) throw err;
});