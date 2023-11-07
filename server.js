const express = require('express');
const mysql = require('mysql2');
// const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'securePassword',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);









app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// SELECT * FROM employees_db.employee, employees_db.role, employees_db.department;