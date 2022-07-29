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

    getEmployeeList() {
        return this.connection.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee`);
    }
    getRolesList() {
        return this.connection.promise().query(`SELECT title FROM role`);
    }
    getDepartmentsList() {
        return this.connection.promise().query(`SELECT name FROM department`);
    }

    // Adds an employee to the database
    async addEmployee(firstName, lastName, role, manager) {
        const ids = [];
        // get roleId of given role
        await this.connection.promise().query(`SELECT id FROM role WHERE title = "${role}"`).then(data => {
            ids.push(data[0][0].id);
        });
        // get managerId of given manager
        manager = manager.split(' ');
        await this.connection.promise().query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, [manager[0], manager[1]]).then(data => {
            ids.push(data[0][0].id);
        });

        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${ids[0]}, ${ids[1]})`
        return this.connection.promise().query(query);
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
    async updateEmployeeRole(employeeName, newRole) {
        employeeName = employeeName.split(' ')
        // Get new role id based on title
        await this.connection.promise().query(`SELECT id FROM role WHERE title = "${newRole}"`).then(data => {
            newRole =  data[0][0].id;
        });

        let query = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`
        return this.connection.promise().query(query, [newRole, employeeName[0], employeeName[1]])
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
    async addRole(nameRole, salary, dept) {
        // Get the id corresponding with the given "dept" department name
        await this.connection.promise().query(`SELECT id FROM department WHERE name = "${dept}"`).then(data => {
            dept = data[0][0].id;
        });

        let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        return this.connection.promise().query(query, [nameRole, salary, dept]);
    }

    // Displays the departments table
    viewDepartments() {
        let query = `SELECT * FROM department`;
        return this.connection.promise().query(query);
    }
    // Adds a department to the database
    async addDepartment(nameDept) {
        let query = `INSERT INTO department (name) VALUES (?)`
        return this.connection.promise().query(query, nameDept)
    }
}

module.exports = Database;