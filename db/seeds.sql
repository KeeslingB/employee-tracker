USE employees_db;

INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role ( title, salary, department_id)
VALUES 
('Sales Lead', 75000,1),
('Salesperson', 55000,1),
('Lead Engineer', 80000,2),
('Software Engineer', 90000,2),
('Account Manager', 50000,3),
('Accountant', 30000,3),
('Legal Team Lead', 45000,4),
('Lawyer', 80000,4);

INSERT INTO employee ( first_name, last_name, role_id ,manager_id ) 
VALUES
 ('Brendan','Keesling',2, NULL),
 ('Jack','Leonard', 1 , NULL),
 ('Brook','Laboon',2 , 2),
 ('Rorona','Zoro',3 , 1),
 ('Hailey','Latney',4 , 4),
 ('Richard','Tonnes',3 , NULL),
 ('Sally', 'Thompson',4 , NULL);


