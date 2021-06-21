
// const { prompt } = require('inquirer')
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
//   }
// ]

// const starter = () => {
//   prompt([
//     {
//       type: 'list',
//       name: 'start',
//       message: 'Employee Tracker',
//       choices: ['View Employees', 'Add Employee', 'Remove Employee', 'Employees By Department', 'View Managers', 'Update Employee Role', 'Update Manager', 'View Roles', 'Add Role', 'EXIT']
//     }
//   ])
//     .then(({ start }) => {
//       switch (start) {
//         case 'View Employees':
//           viewEmployees()
//           break
//         case 'Add Employee':
//           createEmployee()
//           break
//         case 'Remove Employee':
//           getManager()
//           break
//         case 'Employees By Department':
//           viewDepartments()
//           break
//         case 'View Managers':
//           rolesId()
//           break
//         case 'Update Employee Role':
//          managerId()
//           break
//         case 'Update Manager':
//           break
//         case 'View Roles': 
//         viewRoles()
//           break
//         case 'EXIT':
//           process.exit()
//       }

//     })
//     .catch(err => console.log(err))
// }

// async function getDepartments() {
//     const response = await new Promise((resolve, reject) => {
//       db.query('SELECT * FROM department', (err, department) => {
//         if(err) {reject(err)}
//         resolve(department)
//       })
//     })
//     return response
//    }
// async function getRoles() {
//   const response = await new Promise((resolve, reject) => {
//     db.query('SELECT * FROM roles', (err, roles) => {
//       if (err) { reject(err) }
//       resolve(roles)
//     })
//   })
//   return response
// }
// async function getEmployees() {
//   const response = await new Promise((resolve, reject) => {
//     db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department, roles.salary, department.manager FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON manager_id = department.id ', (err, employees, roles, department) => {
//       if (err) { reject(err) }
//       resolve(employees, roles, department)
//     })
//   })
//   return response
// }
// // async function addEmployee () {
// //     const response = await new Promise((resolve, reject) => {
// //     db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.roles_id, employees.manager_id)', (err, employees) => {
// //       if (err) { reject(err) }
// //       resolve(employees)
    
// //     db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department, roles.salary, department.manager FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON manager.id = department.id ', (err, employees, roles, department) => {
// //       if (err) { reject(err) }
// //       resolve(employees, roles, department)
// //     })
// //   })
// // })
// //   return response
// // }


// // async function addRole() {
// //   const response = await new Promise((resolve, reject) => {
// //     db.query(`INSERT INTO roles SET ?`, data, (err, fields) => {
// //       if (err) { reject(err) }
// //       db.query(`SELECT * FROM roles WHERE ?`, { id: fields.insertId }, (err, newData) => {
// //         if (err) { reject(err) }
// //         resolve(newData[0])
// //       })
// //     })
// //   })
// //   return response
// // }
// // async function addDepartment() {
// //   const response = await new Promise((resolve, reject) => {
// //     db.query(`INSERT INTO department  SET ?`, data, (err, fields) => {
// //       if (err) { reject(err) }
// //       db.query(`SELECT * FROM department WHERE ?`, { id: fields.insertId }, (err, newData) => {
// //         if (err) { reject(err) }
// //         resolve(newData[0])
// //       })
// //     })
// //   })
// //   return response
// // }


// const viewDepartments = (action) => {
//       getDepartments()
      
//         .then(department => {
//           console.table(department)
//        getRoles() 
//        .then(employees =>{
//        console.table(employees)
//        contCheck()
//        })
//         .catch(err => {(console.log(err))})
//   })
// }
//   const viewRoles = (action) => {
//     getRoles()
//     .then(roles => {
//       console.table(roles)
//       contCheck()
//     })
//     .catch(err => console.log(err))
//   }
// const viewEmployees = (action) => {
//   getEmployees()
//   .then((employees) => {
//      console.table(employees)
//     contCheck()
//   })
//   .catch((err) => { console.log(err) })

// }
// const managerId = () =>{
//   getDepartments()
//     .then(department => {
//       console.table(department)
//       prompt({
//         type: 'list',
//         name: 'manager_id',
//         message: 'Who is the Employee\'s manager ?',
//         choices: department.map(department => ({
//           name: department.manager,
//           value: department.id
//         }))
//       })
//       .then(({ manager_id }) => {
//         this.manager_id = manager_id
//         console.log(manager_id)
//       })
//         .catch((err) => { console.log(err) })

//     })
    
//     .catch((err) => { console.log(err) })
// }
// const rolesId = () => {
//   getRoles()
//     .then(roles => {
//       console.table(roles)
//       prompt({
//         type: 'list',
//         name: 'roles_id',
//         message: 'Employee\'s role : ',
//         choices: roles.map(roles => ({
//           name: roles.title,
//           value: roles.id
//         }))
//       })
//         .then(({ roles_id }) => {
//           this.roles_id = roles_id
//           console.log(roles_id)
//         })
//         .catch((err) => { console.log(err) })
//     })
//     .catch((err) => { console.log(err) })
// }
// const createEmployee = () => {
//   prompt(newEmployee)
//   .then(employee => {
//   getDepartments()
//     .then(department => {
//       console.table(department)
//       prompt({
//         type: 'list',
//         name: 'manager_id',
//         message: 'Who is the Employee\'s manager ?',
//         choices: department.map(department => ({
//           name: department.manager,
//           value: department.id
//         }))
//         .then(({ manager_id }) => {
//           rolesId(manager_id)
//           console.log(manager_id)
//         })
//       })
//     })
//     .catch((err) => { console.log(err) })
//         .then(() => {
//           getRoles()
//             .then(roles => {
//               console.table(roles)
//               prompt({
//                 type: 'list',
//                 name: 'roles_id',
//                 message: 'Employee\'s role : ',
//                 choices: roles.map(roles => ({
//                   name: roles.title,
//                   value: roles.id
//                 }))
//               })
//             })
//             .catch((err) => { console.log(err) })
//         })
//               .catch((err) => { console.log(err) })
//               .then(({first_name, last_name, manager_id, roles_id}) => {
//                 const newEmployee = [{
//                 first_name,
//                 last_name ,
//                 manager_id,
//                 roles_id 
//                 }]
//                 console.log(first_name, last_name, roles_id, manager_id)

                
//                   db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.roles_id, employees.manager_id) VALUES ????', (newEmployee, err) => {
//                     if (err) { reject(err) }
//                   })      
//                 contCheck()
               
//                 })
//                 .catch((err) => { console.log(err) })
//               })
//             .catch((err) => { console.log(err) })
              
// }

// const contCheck = () => {
//   prompt({
//     type: 'confirm',
//     name: 'choice',
//     message: 'Would you like to continue?'
//   })
//     .then(({ choice }) => choice ? starter() : process.exit())
//     .catch(err => console.log(err))
// }

// const getManager = () => {
//   getRoles()
//     .then(roles => {
//           console.table(roles)
//           prompt({
//             type: 'list',
//             name: 'managerName',
//             message: 'Employee\'s role : ',
//             choices: roles.map(roles => ({
//               name: roles.title,
//               value: roles.id
//             }))
//       })
//       contCheck()
//     })    
//     .catch((err) => { console.log(err) })
// }
// starter()

