const mysql = require('mysql2');

class Database {
    constructor() {
        config = {
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'business_db'
        };
        this.connection = mysql.createConnection(config);
    }

    addEmployee() {

    }
    viewEmployees() {

    }
    updateEmployeeRole() {

    }
    viewRoles() {

    }
    addRole() {

    }
    viewDepartments() {

    }
    addDepartment() {
        
    }
}

module.exports = Database;