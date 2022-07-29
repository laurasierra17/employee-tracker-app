const inquirer = require('inquirer');
const Database = require('./config/business_db');

// Instantiate database
const mydb = new Database();

// List of choices the user can select from during the prompt
const choices = ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];
// List of employees
let employeeList = [];
// List of roles
let roleList = [];
// List of departments
let departmentList = [];

// Based on user selection, a database manipulation will take place and data will be logged to the terminal
function renderChoice(response) {
    // console.log(response)
    switch (response) {
        case choices[0]:
            viewEmployees();
            break;
        case choices[1]:
            addEmployee();
            break;
        case choices[2]:
            updateEmployeeRole();
            break;
        case choices[3]:
            viewRoles();
            break;
        case choices[4]:
            addRole();
            break;
        case choices[5]:
            viewDepartments();
            break;
        case choices[6]:
            addDepartment();
            break;
    }
}

// ----------------- Functions used to update the arrays containing employees, roles, and departments ----------------------
// print current employee list
async function getEmployeeList() {
    return mydb.getEmployeeList().then(data => data[0].forEach(employee => employeeList.push(employee.employee)));
}
// print current roles list
async function getRolesList() {
    return mydb.getRolesList().then(data => data[0].forEach(role => roleList.push(role.title)));
}
// print current department list
async function getDepartmentsList() {
    return mydb.getDepartmentsList().then(data => data[0].forEach(dept => departmentList.push(dept.name)));
}

// --------------------- VIEWING ------------------------
// Function to view employees and restart the prompt
function viewEmployees() {
    mydb.viewEmployees().then(data => {
        console.table(data[0])
        init();
    })
}
// Function to view roles and restart the prompt
function viewRoles() {
    mydb.viewRoles().then(data => {
        console.table(data[0])
        init();
    })
}
// Function to view departments and restart the prompt
function viewDepartments() {
    mydb.viewDepartments().then(data => {
        console.table(data[0])
        init();
    })
}

// --------------------- ADDING ------------------------
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "fName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: roleList,
            name: "role"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: employeeList,
            name: "manager"
        }
    ]).then(response => {
        mydb.addEmployee(response.fName, response.lName, response.role, response.manager).then(data => {
            console.log(`Added ${response.fName} ${response.lName} to the database`);
            init();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department does the role belong to?",
            choices: departmentList,
            name: "department"
        },
    ]).then(response => {
        mydb.addRole(response.roleName, parseFloat(response.salary), response.department).then(data => {
            console.log(`Added ${response.roleName} to the database`);
            init();
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "deptName"
        }
    ]).then(response => {
        mydb.addDepartment(response.deptName).then(data => {
            console.log(`Added ${response.deptName} to the database`);
            init();
        })
    })
}

// --------------------- UPDATING ------------------------
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: employeeList,
            name: "employeeName"
        },
        {
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList,
            name: "newRole"
        },
    ]).then(response => {
        mydb.updateEmployeeRole(response.employeeName, response.newRole).then(data => {
            console.log('Updated employee\'s role');
            init();
        })
    })
}


// Initializes application with the prompts
function init() {
    // Update lists every time we run these questions
    getEmployeeList().then();
    getRolesList().then();
    getDepartmentsList().then()

    // Questionnaire for user
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: choices,
            name: "action"
        }
    ).then(response => {
        if (response.action === "Quit") process.exit(0);
        renderChoice(response.action);
    })
}

// Commence mysql and iquirer as soon as the project runs
init();
