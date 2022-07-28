const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const Database = require('./config/business_db');

// Instantiate database
const mydb = new Database();
mydb.addRole("Janitor", 30000, 5);
function init() {

}

// Commence mysql and iquirer as soon as the project runs
init();