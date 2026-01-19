CREATE DATABASE student_portal;

USE student_portal;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50),
  last_name VARCHAR(50) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  telephone VARCHAR(15),
  email VARCHAR(100) UNIQUE NOT NULL,
  avatar LONGBLOB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);