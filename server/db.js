var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dsh19971225',
  database: 'userdata'
})

db.connect

module.exports = db;