const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'main_options',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit']
  },
])