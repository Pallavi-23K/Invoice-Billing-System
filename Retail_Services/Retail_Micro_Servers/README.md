# Retail Micro Servers

This is the backend for the Retail Services web application, built with Spring Boot, Java 17, and Maven. It provides RESTful APIs for managing users and connects to a local MySQL database.

## Prerequisites

- Java 17
- Maven
- MySQL

## Database Setup

1.  **Create the schema:**
    ```sql
    CREATE DATABASE retail_db;
    ```
2.  **Create the user table:**
    ```sql
    CREATE TABLE user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        mail_id VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(50) NOT NULL
    );
    ```

## How to Run

1.  **Navigate to the project directory:**
    ```bash
    cd Retail_Micro_Servers
    ```
2.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```

The application will start on port 8080.
