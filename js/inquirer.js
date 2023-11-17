const inquirer = require('inquirer');
const db = require('../server');
const { printTable } = require('console-table-printer');

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
    type: 'input',
    message: 'Enter New Department',
    name: 'newDepartment'
  }]).then(response => {
    db.query('INSERT INTO department (name) VALUES(?)', [response.newDepartment], (err) => {
      viewDepartments();
    })
  })
}

function viewDepartments() {
  db.query('SELECT name, id FROM department', (err, data) => {
    printTable(data);
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
    type: 'input',
    message: 'What is the new Roles Salary?',
    name: 'newWage'
  },
  {
    type: 'input',
    message: 'What department does this role belong too?',
    name: 'rolesId'
  },
  ]).then(response => {
    db.query('INSERT INTO role ( title, salary, department_id) VALUES(?,?,?)', [response.newRoleT, response.newWage, response.rolesId], (err) => {
      allRoles();
    })
  })
}

function allEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, CONCAT (manager.first_name, " ", manager.last_name) AS manager_name FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id', (err, data) => {
    if (err) console.log(err);
    printTable(data);
    menu();
  })
}

function allRoles() {
  db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', (err, data) => {
    printTable(data);
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
      name: 'newId'
    },
    {
      type: 'input',
      message: 'What would be this employees manager id?',
      name: 'managerId'
    },
  ]).then(response => {
    db.query('INSERT INTO employee ( first_name, last_name, role_id ,manager_id) VALUES (?,?,?,?)', [response.fName, response.lName, response.newId, response.managerId], (err) => {
      if (err) console.log(err);
      allEmployees();
    })
  })
}

function updateRole() {
  db.query('SELECT id, first_name, last_name FROM  employee', (err, rows) => {
    const rowsFormatted = rows.map(employee => {
      const name = employee.first_name + " " + employee.last_name;
      return {
        value: employee.id ,
        name
      }
    })

    inquirer.prompt([
      {
        type: 'list',
        message: 'What Employees role would you like to update?',
        name: 'employeeChoice',
        choices: rowsFormatted
      },
    ]).then(selectedEmployee => {
      db.query('SELECT id, title FROM  role', (err, rows) => {
        const rowsFormatted = rows.map(role => {
          return {
            value: role.id,
            name: role.title
          }
        })
        inquirer.prompt([
          {
            type: 'list',
            message: 'What role would you like to update to?',
            name: 'updatedRole',
            choices: rowsFormatted
          }
        ]).then(newRole => {
          db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRole.updatedRole, selectedEmployee.employeeChoice],(err, result) =>{
            if (err) {console.log(err)};
            console.log('employees role updated' );
            menu()
          })
        })
      })
    })
  })
}


function quit() {
  process.exit();
}