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

    // Adds an employee to the database
    addEmployee(firstName, lastName, roleId, managerId) {
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`

        this.connection.promise().query(query, [firstName, lastName, roleId, managerId])
            .then(result => console.log(`Added ${firstName} ${lastName} to the database`))
            .catch(console.log)
            .then(() => this.connection.end());
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

        this.connection.promise().query(query)
            .then(result => console.table(result[0]))
            .catch(console.log)
            .then(() => this.connection.end());
    }

    // Update an employee's role
    updateEmployeeRole(employeeName, newRoleId) {
        let query = `UPDATE employee SET role_id = ? WHERE last_name = ?`

        this.connection.promise().query(query, [newRoleId, employeeName.split(' ')[1]])
            .then(result => `Updated employee's role`)
            .catch(console.log)
            .then(() => this.connection.end());
    }
    // Displays the roles table
    viewRoles() {
        let query =
            `SELECT role.id, role.title, department.name, role.salary
            FROM role
            JOIN department ON role.department_id = department.id`;

        this.connection.promise().query(query)
            .then(result => console.table(result[0]))
            .catch(console.log)
            .then(() => this.connection.end());
    }
    // Adds a role to the database
    addRole(nameRole, salaryRole, deptId) {
        let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`

        this.connection.promise().query(query, [nameRole, salaryRole, deptId])
            .then(result => `Added ${nameRole} to the database`)
            .catch(console.log)
            .then(() => this.connection.end());
    }

    // Displays the departments table
    viewDepartments() {
        let query = `SELECT * FROM department`;

        this.connection.promise().query(query)
            .then(result => console.table(result[0]))
            .catch(console.log)
            .then(() => this.connection.end());
    }
    // Adds a department to the database
    addDepartment(nameDept) {
        let query = `INSERT INTO department (name) VALUES (?)`

        this.connection.promise().query(query, nameDept)
            .then(result => `Added ${nameDept} to the database`)
            .catch(console.log)
            .then(() => this.connection.end());
    }
}

module.exports = Database;