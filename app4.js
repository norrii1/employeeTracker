
const { prompt } = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const { join } = require('path')
const db = require('./db')
const { manager_id } = require('./app3')

require('console.table')

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
        case 'View Managers':
          break
        case 'Update Employee Role':
          break
        case 'Update Manager':
          upDate()
          break
        case 'View Roles':
          viewRoles()
          break
        case 'EXIT':
          process.exit()
      }

    })
    .catch(err => console.log(err))
}

async function getDepartments() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM department', (err, department) => {
      if (err) { reject(err) }
      resolve(department)
    })
  })
  return response
}
async function getRoles() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM roles', (err, roles) => {
      if (err) { reject(err) }
      resolve(roles)
    })
  })
  return response
}
async function getEmployee() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department, roles.salary FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON department.id = manager_id  ', (err, employees, roles, department) => {
      if (err) { reject(err) }
      resolve(employees, roles, department)
    })
  })
  return response
}
async function getEmployees() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.first_name, employees.last_name FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON department.id = manager_id  ', (err, employees, roles, department) => {
      if (err) { reject(err) }
      resolve(employees, roles, department)
    })
  })
  return response
}
async function upDateManager() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id  FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON manager_id = department.id  ', (err, employees, roles, department) => {
      if (err) { reject(err) }
      resolve(employees, roles, department)
    })
  })
  return response
}
async function employeeDepartment() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.first_name, employees.last_name, roles.title, department.department, roles.salary FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON manager_id = department.id   ', (err, employees, roles, department) => {
      if (err) { reject(err) }
      resolve(employees, roles, department)
    })
  })
  return response
}
// a
// async function addEmployee () {
//     const response = await new Promise((resolve, reject) => {
//     db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.roles_id, employees.manager_id)', (err, employees) => {
// Error Code: 1146. Table 'employeetracker_db.employeees' doesn't exist

//       if (err) { reject(err) }
//       resolve(employees)

//     db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department, roles.salary, department.manager FROM employees INNER JOIN roles ON roles_id = roles.id INNER JOIN department ON manager.id = department.id ', (err, employees, roles, department) => {
//       if (err) { reject(err) }
//       resolve(employees, roles, department)
//     })
//   })
// })
//   return response
// }


// async function addRole() {
//   const response = await new Promise((resolve, reject) => {
//     db.query(`INSERT INTO roles SET ?`, data, (err, fields) => {
//       if (err) { reject(err) }
//       db.query(`SELECT * FROM roles WHERE ?`, { id: fields.insertId }, (err, newData) => {
//         if (err) { reject(err) }
//         resolve(newData[0])
//       })
//     })
//   })
//   return response
// }
// async function addDepartment() {
//   const response = await new Promise((resolve, reject) => {
//     db.query(`INSERT INTO department  SET ?`, data, (err, fields) => {
//       if (err) { reject(err) }
//       db.query(`SELECT * FROM department WHERE ?`, { id: fields.insertId }, (err, newData) => {
//         if (err) { reject(err) }
//         resolve(newData[0])
//       })
//     })
//   })
//   return response
// Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails(`employeetracker_db`.`employees`, CONSTRAINT`employees_ibfk_1` FOREIGN KEY(`roles_id`) REFERENCES`roles`(`id`))

// }

const employeesDepartment = () => {
  employeeDepartment()
    .then(employees => {
      console.table(employees)
      contCheck()

})
 .catch(err => { (console.log(err)) })
}

const viewDepartments = () => {
  getEmployee()
        .then(employees => {
          prompt({
            type: 'list',
            name: 'employees_id',
            message: 'Who is the Employee\'s manager ?',
            choices: employees.map(employees => ({
              name: employees.first_name,
              value: employees.roles_id
            }))
          })
            .then(({ employees_id  }) => {
              this.employees_id = employees_id
              console.log(employees_id )
            })
            .catch(err => { (console.log(err)) })

        })
        .catch(err => { (console.log(err)) })
    }
    const upDate= () => {
      upDateManager()

        .then(employees => {
          console.table(employees)
          prompt({
            type: 'list',
            name: 'employees_id',
            message: 'Update Employee\'s Manager',
            choices: employees.map(employees => ({
              name: employees.first_name,
              value: employees.manager_id
            }))
          })
            .then(({ employees_id }) => {
              this.employees_id = employees_id
              console.log(employees_id)
              contCheck()
            })
            .catch(err => { (console.log(err)) })

        })
        .catch(err => { (console.log(err)) })
    }
const viewRoles = () => {
  getRoles()
    .then(roles => {
      console.table(roles)
      contCheck()
    })
    .catch(err => console.log(err))
}
const deleteEmployees = () => {
  getEmployee()
    .then(employees => {
      prompt({
        type: 'list',
        name: 'employees_id',
        message: 'Remove Employee : ',
        choices: employees.map(employees => ({
          name: employees.first_name,
          value: employees.id
        }))
      })
        .then(({ employees_id }) => {
          this.employees_id = employees_id
          console.log(employees_id)
          contCheck()
        })
        .catch(err => { (console.log(err)) })
    })
    .catch(err => { (console.log(err)) })
  }

const viewEmployees = () => {
      getEmployee()
        .then(department => {
          console.table(department)
          contCheck()
       })
        .catch(err => {(console.log(err))})
 
}
const managerId = () => {
  getDepartments()
    .then(department => {
      console.table(department)
      prompt({
        type: 'list',
        name: 'manager_id',
        message: 'Who is the Employee\'s manager ?',
        choices: department.map(department => ({
          name: department.manager,
          value: department.id
        }))
      })
        .then(({ manager_id }) => {
          this.manager_id = manager_id
          console.log(manager_id)
        })

        .catch((err) => { console.log(err) })

    })

    .catch((err) => { console.log(err) })
}
const rolesId = () => {
  getRoles()
    .then(roles => {
      console.table(roles)
      prompt({
        type: 'list',
        name: 'roles_id',
        message: 'Employee\'s role : ',
        choices: roles.map(roles => ({
          name: roles.title,
          value: roles.id
        }))
      })
        .then(({ roles_id }) => {
          this.roles_id = roles_id
          console.log(roles_id)
        })

        .catch((err) => { console.log(err) })
    })
    .catch((err) => { console.log(err) })
}
const createEmployee = () => {
 
  // viewDepartments() 
  
     prompt(newEmployee)
     .then(({first_name, last_name}) => {
       this.first_name = first_name
       this.last_name = last_name
      console.log(first_name)
       console.log(last_name)
     })
    
    .catch((err) => { console.log(err) })
 viewDepartments()
 rolesId()
}
  
 //   function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 1000);
//   });
// }
//   async function managerId() {
//     const result = resolveAfter2Seconds()
//     console.log(result)
//   }

//   function managerId() {
//     return manager_id
//   }

const contCheck = () => {
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Would you like to continue?'
  })
    .then(({ choice }) => choice ? starter() : process.exit())
    .catch(err => console.log(err))
}

const getManager = () => {
  getRoles()
    .then(roles => {
      console.table(roles)
      prompt({
        type: 'list',
        name: 'managerName',
        message: 'Employee\'s role : ',
        choices: roles.map(roles => ({
          name: roles.title,
          value: roles.id
        }))
      })
      contCheck()
    })
    .catch((err) => { console.log(err) })
}
starter()

