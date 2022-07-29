const inquirer = require('inquirer');
const Database = require('./config/business_db');

// Instantiate database
const mydb = new Database();

// List of choices the user can select from during the promp
const choices = ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];

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
        case choices[7]:
            break;
    }
}

// --------------------- VIEWING ------------------------
// Function to view employees and restart the prompt
function viewEmployees() {
    mydb.viewEmployees().then(data => {
        console.table(data[0])
        init()
    })
}
// Function to view roles and restart the prompt
function viewRoles() {
    mydb.viewRoles().then(data => {
        console.table(data[0])
        init()
    })
}
// Function to view departments and restart the prompt
function viewDepartments() {
    mydb.viewDepartments().then(data => {
        console.table(data[0])
        init()
    })
}

// --------------------- ADDING ------------------------
function addEmployee() {
    
}

function addRole() {

}

function addDepartment() {

}

// --------------------- UPDATING ------------------------

// Initializes application with the prompts
function init() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: choices,
            name: "action"
        }
    ).then(response => renderChoice(response.action))
}

// Commence mysql and iquirer as soon as the project runs
init();