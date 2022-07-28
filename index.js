const inquirer = require('inquirer');
const Database = require('./config/business_db');

// Instantiate database
const mydb = new Database();

function init() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
            name: "action"
        }
    ).then(response => {
        console.log(response);
    })
}

// Commence mysql and iquirer as soon as the project runs
init();