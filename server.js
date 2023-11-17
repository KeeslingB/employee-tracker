const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '', // will need to use your password here
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

module.exports = db;
