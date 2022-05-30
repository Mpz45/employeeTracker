const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
require('console.table');
const { title } = require('process');

let employeeArr = [];
let rolesArr = [];

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Media#344',
    database: 'employeeTracker_db'
});

const employeeUpdate = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'employeeChoice',
            message: "Welcome. What would you like to do?",
            Choices: ['View Employees',
            'View Departments',
            'View Roles',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Update Roles',
            'Quit'
            ]
        }
    ]).then((answer) => {
        switch(answer.employeeChoice){
            case 'View Employees':
                viewEmployees();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
            case 'Update Roles':
                updateRoles();
            
        }
    });
};

const viewEmployees = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
    FROM employee 
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN employee_Role ON employee.role_id = employee_Role.id
    INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;`
    db.query(query, (err, res) => {
        if(err)
            throw err
            console.log("Viewing Employees")
            console.table(res)
            employeeUpdate()
    })
};

const viewDepartments = () => {
    const query = `SELECT dept_name FROM employee_Dept`
    db.query(query, (err, res) => {
        if(err)
            throw err
            console.log('Viewing Departments')
            console.table(res)
            employeeUpdate()
    })
};

const viewRoles = () => {
    rolesArr = []
    const query = `SELECT title FROM employee_Role`
    db.query(query, (err, res) => {
        if(err)
            throw err;
            res.array.forEach(({title}) => {
                rolesArr.push(title);
            console.log("Viewing Roles")
            console.table(res)
            employeeUpdate()    
            });
            
    })
};

const addEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is employees first name?',
        name: 'firstName'
      },
      { 
        type: 'input',
        message: 'What is employees last name?',
        name: 'lastName'
      },
      {
        type: 'input',
        message: 'What is employees role id?',
        name: 'roleId'
      },
      {
        type: 'input',
        message: 'What is employees manager id?',
        name: 'managersId'
      }
    ]).then((answers)=>{
      db.query(`INSERT INTO employee SET ?`,
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: answers.roleId,
        manager_id: answers.managersId
      },
      (err) => {
        if (err) throw err;
        console.log('Added employee')
        console.table(answers)
        employeeUpdate()
  
      })
    })
  };

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'newDept'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO employee_Dept SET`,
        {
            dept_name: answers.newDept
        },
        (err) => {
            if(err) throw err;
            console.log('Added Department')
            console.table(answers)
            employeeUpdate()
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What role would you like to add?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'Enter is their salary?',
            name: 'salary'
        }
    ]).then((answers)=> {
        db.query(`INSERT INTO employee_Role SET ?`,
        {
          title: answers.newRole,
          salary: answers.salary
        },
        (err) => {
          if (err) throw err;
          console.log('Added new Role')
          console.table(answers)
          employeeUpdate()
        })
    })
};

employeeArr = [];
const query = 'SELECT first_name FROM employee';
db.query(query, (err, res) => {
    if(err) throw err;
    res.forEach(({first_name}) => {
        employeeArr.push(first_name);
    });
});
rolesArr = [];
const query2 = 'SELECT title FROM employee_Role'
db.query(query2, (err, res) => {
    if(err) throw err;
    res.forEach(({title}) => {
        rolesArr.push(title);
    });
});

const updateRoles = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: employeeArr,
            name: 'roleUpdate'
        },
        {
            type: 'list',
            message: 'What role would you like add?',
            choices: rolesArr,
            name: 'newRole'
        }
    ]).then((answers) => {
        db.query(`UPDATE employee_Role SET tit;e = ? WHERE first_name = ?`,
        {
            title: answers.newRole,
            first_name: answers.roleUpdate
        },
        (err) => {
            if(err) throw err;
            console.log('Updated Employee')
            console.table(answers)
            employeeUpdate()
        })
    })
};

employeeUpdate();