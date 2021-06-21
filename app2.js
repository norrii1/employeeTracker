
const { prompt } = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const { join } = require('path')
const db = require('./db')
const { getDepartments } = require('./models/Department.js')
const { getDepartment } = require('./models/Department.js')
const { addDepartment } = require('./models/Department.js')
const { getEmployees } = require('./models/Employee.js')
require('console.table')
const orm = require('./models/orm')
const Department = require('./models/Department.js')




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
    name: 'role',
    message: 'Employee Role : '
  }
]
const Manager = [
  {
    type: 'list',
    name: 'managerName',
    message: 'Employee Manager : ',
    choices: ['Joc Pederson', 'Kobe Bryant', 'Alex Verdugo']
  }
]

  

const starter = () => {
  prompt([
    {
      type: 'list',
      name: 'start',
      message: 'Employee Tracker',
      choices: ['View Employees', 'Add Employee', 'Remove Employee', 'Employees By Department', 'View Managers', 'Update Employee Role', 'Update Manager', 'View Roles', 'Add Role', 'EXIT']
    }
  ])
    .then(({ start }) => {
      switch (start) {
        case 'View Employees':
          contCheck()
          break
        case 'Add Employee':
          viewManager()
          break
        case 'Remove Employee':
          break
        case 'Employees By Department':
          viewDepartments(action)
          break
        case 'View Managers':
          break
        case 'Update Employees Role':
          break
        case 'Update Manager':
          break
        case 'View Roles':
          break
        case 'EXIT':
          process.exit()
      }

    })
    .catch(err => console.log(err))
}
const viewDepartments = (action) => {
  switch (action) {
    case 'Employees By Department':
      getDepartments()
        .then(departments => {
          console.table(departments)
        })
        .catch(err => {(console.log(err))})
  }
}

const createEmployee = () => {
  prompt(newEmployee)
    .then((newEmployee) => {
    contCheck()
    })

    .catch(err => {console.log(err)})


}
const viewManager = () => {
  prompt(Manager)
  .then(() => {
    createEmployee()
  })
  .catch(err => console.log(err))
}
const contCheck = () => {
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Would you like to continue?'
  })
    .then(({ choice }) => choice ? starter() : process.exit())
    .catch(err => console.log(err))
}

starter()

