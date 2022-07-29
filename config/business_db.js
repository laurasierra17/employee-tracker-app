const mysql = require('mysql2');
const cTable = require('console.table');
const init = require('..');

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

        this.connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
            if (err) console.log(err)
            console.log(`Added ${firstName} ${lastName} to the database`);
        })
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

        return this.connection.promise().query(query);
    }

    // Update an employee's role
    updateEmployeeRole(employeeName, newRoleId) {
        let query = `UPDATE employee SET role_id = ? WHERE last_name = ?`
        this.connection.query(query, [newRoleId, employeeName.split(' ')[1]], (err, result) => {
            if (err) console.log(err)
            console.log(`Updated employee's role`);
        })
    }
    // Displays the roles table
    viewRoles() {
        let query =
            `SELECT role.id, role.title, department.name, role.salary
            FROM role
            JOIN department ON role.department_id = department.id`;

        return this.connection.promise().query(query);
    }
    // Adds a role to the database
    addRole(nameRole, salaryRole, deptId) {
        let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        this.connection.query(query, [nameRole, salaryRole, deptId], (err, result) => {
            if (err) console.log(err)
            console.log(`Added ${nameRole} to the database`);
        })
    }

    // Displays the departments table
    viewDepartments() {
        let query = `SELECT * FROM department`;
        return this.connection.promise().query(query);
    }
    // Adds a department to the database
    addDepartment(nameDept) {
        let query = `INSERT INTO department (name) VALUES (?)`
        this.connection.query(query, nameDept, (err, result) => {
            if (err) console.log(err)
            console.log(`Added ${nameDept} to the database`);
        })
    }
}

module.exports = Database;