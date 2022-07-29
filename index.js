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
            console.log('here 2')
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
}

// Initializes application with the prompts
async function init() {
    let questions = await inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: choices,
            name: "action"
        }
    );
    let response = await questions;
    console.log('here 1')
    let display = await new Promise(() => renderChoice(response.action))

    let next = await display;
    if (next) {
        console.log('here 5')
        init();
    }
}

// Commence mysql and iquirer as soon as the project runs
init();