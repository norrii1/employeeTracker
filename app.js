const { prompt } = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const { join } = require('path')
const db = require('./db')

require('console.table')

const contCheck = () => {
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Would you like to continue?'
  })
    .then(({ choice }) => choice ? starter() : process.exit())
    .catch(err => console.log(err))
}

const newEmployee = [
  {
    type: 'input',
    name: 'first_name',
    message: 'First Name : '
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Last Name : '
  },
  {
    type: 'input',
    name: 'roles_id',
    message: `
    Enter role number: 
    1. Sales Lead 
    2. Salesman
    3. Accountant
    4. Lead Engineer
    5. Software Engineer
    6. Legal Team Lead
    7. Lawyer
     `
  },
  {
    type: 'input',
    name: 'manager_id',
    message: `
    Enter Manager Number :
    1. Joc Pederson
    2. Kobe Bryant
    3. Doc Brown
    4. Abraham Lincoln
    `
  }
]

const starter = () => {
  prompt([
    {
      type: 'list',
      name: 'start',
      message: 'Employee Tracker',
      choices: ['View Employees', 'Add Employee', 'Remove Employee', 'Employees By Department', 'Update Employee Role', 'View Roles', 'Add Role', 'EXIT']
    }
  ])
    .then(({ start }) => {
      switch (start) {
        case 'View Employees':
          viewEmployees()
          break
        case 'Add Employee':
          createEmployee()
          break
        case 'Remove Employee':
          deleteEmployees()
          break
        case 'Employees By Department':
          employeesDepartment()
          break
        case 'Update Employee Role':
          updateRole()
          break
        case 'View Roles':
          viewRoles()
          break
        case 'Add Role':
          addRole()
          break
        case 'EXIT':
          process.exit()
      }
    })
    .catch(err => console.log(err))
}

async function getEmployees() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department, roles.salary FROM employees INNER JOIN roles ON roles.id = roles_id INNER JOIN department ON department.id = manager_id  ', (err, employees, roles, department) => {
      if (err) { reject(err) }
      resolve(employees, roles, department)
    })
  })
  return response
}
async function employeeDepartment() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.first_name, employees.last_name, department.department FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON manager_id = department.id   ', (err, employees, roles, department) => {
      if (err) { reject(err) }
      resolve(employees, roles, department)
    })
  })
  return response
}

async function getRoles() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT roles.title, roles.salary FROM roles', (err, roles) => {
      if (err) { reject(err) }
      resolve(roles)
    })
  })
  return response
}

const viewEmployees = () => {
  getEmployees()
    .then(employee => {
      console.table(employee)
      contCheck()
    })
    .catch(err => console.log(err))

}

const createEmployee = () => {
  prompt(newEmployee)
  .then(newEmployee => {
    db.query('INSERT INTO employees SET ?', newEmployee, err => {
      if(err){ console.log(err) }
      console.log('Employee Created')
      contCheck( )
    })
  })
  .catch(err => console.log(err))
}

const deleteEmployees = () => {
  getEmployees()
  .then(employees => {
    prompt({
      type: 'list',
      name: 'id',
      message: 'Choose an employee',
      choices: employees.map(employee => ({
        name: employee.first_name,
        value: employee.id
      }))
    })
    .then(id => {
      db.query('DELETE FROM employees WHERE ?', id, err => {
        if (err) { console.log(err) }
        console.log('Employee deleted!')
        contCheck()
      })
    })
  })
  .catch(err => console.log(err))
}

const employeesDepartment = () => {
  employeeDepartment()
    .then(employees => {
      console.table(employees)
      contCheck()
    })
    .catch(err => console.log(err))
  }

const updateRole = () => {
  getEmployees()
  .then(employees => {
    console.table(employees)
    prompt({
      type: 'list',
      name: 'id',
      message: 'Choose an employee',
      choices: employees.map(employee => ({
        name: employee.first_name,
        value: employee.id
      }))
    })
        .then(({ id }) => {
          prompt({
            type: 'number',
            name: 'roles_id',
            message: `
            Enter role number: 
                1. Sales Lead 
                2. Salesman
                3. Accountant
                4. Lead Engineer
                5. Software Engineer
                6. Legal Team Lead
                7. Lawyer
            `
          })
          .then(({  roles_id }) => {
           const condition = [{id}, {roles_id}]
            db.query('UPDATE employees SET ? WHERE ?',  condition, err => {
              if (err) { console.log(err) }
              console.log('Role Updated')
              contCheck()
            })
          })
            .catch(err => console.log(err))
        })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

const viewRoles = () => {
  getRoles()
    .then(roles => {
      console.table(roles)
      contCheck()
    })
    .catch(err => console.log(err))
}

const addRole = ( ) => {
  getRoles( )
  .then(role => {
    prompt([
      {
      type: 'input',
      name: 'title',
      message: `Add a New Role : `
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Salary Amount : '
    },
    {
      type: 'number',
      name: 'department_id',
      message: `
      Enter a Department Number : 
      1. Sales
      2. Finance
      3. Engineering
      4. Legal
      `
    }
  ])
  .then(role => {
    db.query('INSERT INTO roles SET ?', role, err => {
      if (err) { console.log(err) }
      console.log('Role Created')
      contCheck()
    })
  })
  })
}
    

starter( )