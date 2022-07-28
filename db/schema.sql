-- Create database to hold employee data
DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

-- Table that holds all of the departments
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)

