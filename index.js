const inquirer = require('inquirer');
const Database = require('./config/business_db');

// Instantiate database
const mydb = new Database();

const choices = ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];

function init() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: choices,
            name: "action"
        }
    ).then(response => {
        switch (response) {
            case choices[0]:
                mydb.viewEmployees();
                break;
            case choices[1]:
                break;
            case choices[2]:
                break;
            case choices[3]:
                mydb.viewRoles();
                break;
            case choices[4]:
                break;
            case choices[5]:
                mydb.viewDepartments();
                break;
            case choices[6]:
                break;
            case choices[7]:
                break;
        }
        init();
    })
}

// Commence mysql and iquirer as soon as the project runs
init();