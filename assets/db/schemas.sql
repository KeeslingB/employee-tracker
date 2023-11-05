DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
);

CREATE TABLE row (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(100000),
  department_id INT,
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NOT NULL,
);








-- CREATE TABLE courses (
--   id INT NOT NULL,
--   course_title VARCHAR(30) NOT NULL,
--   course_description TEXT NOT NULL,
--   active BOOLEAN NOT NULL,
--   date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );