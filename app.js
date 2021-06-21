// const {prompt} = require('inquirer')
// const mysql = require('mysql2')
// const express = require('express')
// const { join } = require('path')
// const db = require('./db')
// require('console.table')

// const newEmployee = [
//   {
//     type: 'input',
//     name: 'first_name',
//     message: 'First Name : '
//   },
//   {
//     type: 'input',
//     name: 'last_name',
//     message: 'Last Name : '
//   },
//   {
//     type: 'input',
//     name: 'role',
//     message: 'Employee Role : '
//   }
// ]

// async function getDepartment() {
//   const response = await new Promise((resolve, reject) => {
//     db.query('SELECT * FROM department', (err, department) => {
//       if (err) { reject(err) }
//       resolve(department)
//     })
//   })
//   return response
// }
// async function getEmployees() {
//   const response = await new Promise((resolve, reject) => {
//     db.query('SELECT * FROM employees', (err, employees) => {
//       if (err) { reject(err) }
//       resolve(employees)
//     })
//   })
//   return response
// }
// async function getRole() {
//   const response = await new Promise((resolve, reject) => {
//     db.query('SELECT * FROM roles', (err, roles) => {
//       if (err) { reject(err) }
//       resolve(roles)
//     })
//   })
//   return response
// }

// const starter = () => {
//   prompt([
//     {
//     type: 'list',
//     name: 'start',
//     message: 'Employee Tracker',
//     choices: ['View Employees', 'Add Employee', 'Remove Employee', 'Employees By Department', 'View Managers', 'Update Employee Role', 'Update Manager', 'View Roles', 'Add Role','EXIT']
//     }
//   ])
//   .then(({start}) =>{
//     switch(start){
//       case 'View Employees':
//         viewEmployees()
//         break
//       case 'Add Employee':
//         createEmployee()
//       //   break
//       // case 'Remove Employee':
//       //   break
//       // case 'Employees By Department':
//       //   viewDepartments(action)
//       //   break
//       // case 'View Managers':
//       //   break
//       // case 'Update Employees Role':
//       //   break
//       // case 'Update Manager':
//       //   break
//       // case 'View Roles':
//       //   break
//       // case 'EXIT':
//       //   process.exit()
//     }

//   })
//   .catch(err => console.log(err))
// }
// const viewEmployees = () => {
//   getEmployees()
//     .then(employees => {
//       console.table(employees)
      
//     })
//     .catch(err => console.log(err))
// }
// const viewDepartments = (action) => {
//   switch(action){
//     case 'Employees By Department':
//       getDepartments()
//       .then(departments => {
//         console.table(departments)
//       })
//       .catch(err =>(console.log(err)))
//   }
//   // getDepartments()
//   //   .then(department => {
//   //     console.table(department)
//   //     starter()
//   //   })
//   //   .catch(err => console.log(err))
// }
// const createEmployee = () => {
//   prompt(newEmployee)
//   .then(() => console.log(err))
//   .catch(err => console.log(err))
//   // .then(employee => {
//   //   db.query('INSERT INTO employee ')
//   // })

// }



// // const viewEmployees = () => {
// //   getEmployees()
// //   .then(employees => {
// //     console.table(employees)
// //     starter()
// //   })
// //   .catch(err => console.log(err))
// // }
// starter()

  