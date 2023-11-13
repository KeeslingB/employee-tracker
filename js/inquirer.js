const inquirer = require('inquirer');
const db = require('../server');
const {printTable }= require('console-table-printer');

db.connect(() => {
  menu()
})

function menu() {
  prompt = inquirer.prompt([
    {
      name: 'main_options',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add Employee',
        'View All Employees',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
      ]
    },
  ]).then(response => {
    switch (response.main_options) {
      case 'Add Employee':
        addEmployee()
        break
      case 'Update Employee Role':
        updateRole()
        break
      case 'View All Roles':
        allRoles()
        break
      case 'Add Role':
        addRole()
        break
      case 'View All Departments':
        viewDepartments()
        break
      case 'Add Department':
        addDepartment()
        break
        case 'View All Employees':
          allEmployees()
          break
      case 'Quit':
              quit()
        break
        
    }
  })
}

function addDepartment() {
  inquirer.prompt([{
    type:'input',
    message:'Enter New Department',
    name: 'newDepartment'
  }]).then(response => {
    db.query('INSERT INTO department (name) VALUES(?)',[response.newDepartment],(err) => {
      viewDepartments();
    })
  })
}

function viewDepartments() {
  db.query('SELECT * FROM department', (err, data) =>{
    printTable(data) ;
    menu();
  })
}

function addRole() {
 inquirer.prompt([{
  type: 'input',
  message: 'What is the new Role Title?',
  name: 'newRoleT',
 },
 {
  type:'input',
  message:'What is the new Roles Salary?',
  name:'newWage'
 },
{
  type:'input',
  message:'What department does this role belong too?',
  name:'rolesId'
},
]).then(response => {
  db.query('INSERT INTO roles ( title, salary, department_id)VALUES(?,?,?)',[response.newRoleT,response.newWage, response.rolesId],(err) => {
    allRoles();
  }) 
 })
}

function allEmployees(){
  db.query('SELECT * FROM employee', (err, data) =>{
    printTable(data) ;
    menu();
  })
}


function allRoles() {
  db.query('SELECT * FROM roles', (err, data) =>{
    printTable(data) ;
    menu();
  })
}

function addEmployee() {
inquirer.prompt([
  {
    type: 'input',
    message: 'New Employees First Name?',
    name: 'fName'
  },
  {
    type: 'input',
    message: 'New Employees Last Name?',
    name: 'lName'
  },
  {
    type: 'input',
    message: 'Employees Role ID?',
    name:'newId'
  },
  {
    type: 'input',
    message: 'is this person a manager?',
    name: 'managerId'
  },
]).then (response => {
  db.query('INSERT INTO employee ( first_name, last_name, role_id ,) VALUES (?,?,?,?)',[response.fName, response.lName, response.newId , response.managerId], (err) => {
    allEmployees();
  })
})
}

function updateRole() {
  // connection.query(`SELECT * FROM roles;`, (err, res) => {
  //   if (err) throw err;
  //   let roles = res.map(roles => ({name: roles.title, value: roles.roles_id }));
  inquirer.prompt([
    // {
    //   type: 'input',
    //   message: 'What role title would you like to update?',
    //   name: 'roleUpdate',
    // },
    {
      type: 'input',
      message: 'roles new salary?',
      name: 'roleSalary'
    },
    {
      type: 'input',
      message: 'what department id does this role belong to?',
      name:'roleSetId'
    },
])}
// )}



function quit() {
  process.exit();
}