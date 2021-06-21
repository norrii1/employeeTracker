DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;
CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(40) NOT NULL
);

USE employeeTracker_db;
CREATE TABLE roles (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
    
USE employeeTracker_db;
CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
)