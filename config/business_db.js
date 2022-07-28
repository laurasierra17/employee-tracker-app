const mysql = require('mysql2');

class Database {
    constructor() {
        this.host = '127.0.0.1',
        this.user = 'root',
        this.password = 'password',
        this.database = 'business_db'
    }
}

module.exports = Database;