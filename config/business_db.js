const mysql = require('mysql2');
const cTable = require('console.table');

class Database {
    constructor() {
        this.config = {
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'business_db'
        };
        this.connection = mysql.createConnection(this.config);
    }

    confirmConnection() {
        console.log("Connected to the business_db database.");
    }

    // Adds an employee to the database
    addEmployee() {

    }
    // Displays the employees table
    viewEmployees() {
        // Create a column called 'manager' that includes first and last name of an employee's manager
        let getManager =
            `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS manager
            FROM employee
            WHERE employee.manager_id = employee.id`

        let query =
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
             FROM employee 
             INNER JOIN role ON employee.role_id = role.id
             INNER JOIN department ON role.department_id = department.id`
        this.connection.query(query, (err, result) => {
            if (err) console.log(err);
            console.table(result)
        })
    }
    // Update an employee's role
    updateEmployeeRole() {

    }
    // Displays the roles table
    viewRoles() {

    }
    // Adds a role to the database
    addRole() {

    }
    // Displays the departments table
    viewDepartments() {

    }
    // Adds a department to the database
    addDepartment() {

    }
}

module.exports = Database;