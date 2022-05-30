DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

-- Table for employees
CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11),
    PRIMARY KEY (id) 
);

-- Table for employee roles
CREATE TABLE employee_Role (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER(11),
    PRIMARY KEY (id) 
);

-- Table for employee department 
CREATE TABLE employee_Dept(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30),
    PRIMARY KEY (id) 
);