// Used to generate random data


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


///////////////////////////////////
// Generate 50 random information for user_info table
var data = [];
for(var i = 0; i < 50; i++){
    data.push([
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.name.gender(true),
        faker.phone.phoneNumber('###-####-####'),
        faker.name.title()
    ]);
}
var q = 'INSERT INTO user_info (email, password, user_name, gender, contact_info, personal_intro) VALUES ?';
connection.query(q, [data], function(err, result) {
    console.log(err);
    console.log(result);
  });



// Disconnect from mysql
connection.end(function(err){
    if(err) throw err;
});