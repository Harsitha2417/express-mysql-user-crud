# Express MySQL User CRUD

A simple User Management System built using **Node.js**, **Express.js**, **EJS**, and **MySQL**. This project demonstrates complete CRUD (Create, Read, Update, Delete) operations with server-side rendering and database integration.

---

## Features

* View all users
* Add a new user
* Edit an existing user's username
* Delete a user
* Password verification before updating a username
* Email and password verification before deleting a user
* Server-side rendering using EJS
* Uses UUID for generating unique user IDs
* Uses Faker.js for generating dummy user data

---

## Tech Stack

* Node.js
* Express.js
* EJS
* MySQL
* mysql2
* Faker.js
* UUID
* Method Override
* Dotenv

---

## Project Structure

```text
express-mysql-user-crud/
│
├── views/
│   ├── Adduser.ejs
│   ├── Deleteuser.ejs
│   ├── edit.ejs
│   ├── home.ejs
│   └── showusers.ejs
│
├── index.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Harsitha2417/express-mysql-user-crud.git
```

### 2. Navigate to the project folder

```bash
cd express-mysql-user-crud
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file in the project root and add:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=learn_app
```

### 5. Create the MySQL database

```sql
CREATE DATABASE learn_app;

USE learn_app;

CREATE TABLE user (
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);
```

### 6. Run the application

```bash
node index.js
```

Open your browser and visit:

```
http://localhost:8080
```

---

## Routes

| Method | Route              | Description                          |
| ------ | ------------------ | ------------------------------------ |
| GET    | `/`                | Home page                            |
| GET    | `/user`            | Display all users                    |
| GET    | `/user/new`        | Display the add user form            |
| POST   | `/user`            | Add a new user                       |
| GET    | `/user/:id/edit`   | Display the edit user form           |
| PATCH  | `/user/:id`        | Update a user's username             |
| GET    | `/user/:id/delete` | Display the delete confirmation page |
| DELETE | `/user/:id`        | Delete a user                        |

---

## Packages Used

* express
* mysql2
* ejs
* dotenv
* method-override
* uuid
* @faker-js/faker

---

## Learning Outcomes

This project helped me understand:

* Express.js routing
* CRUD operations
* EJS templating
* Connecting Node.js with MySQL
* Handling HTML forms
* Environment variable management using Dotenv
* UUID generation
* Method Override for PATCH and DELETE requests
* Basic Git and GitHub workflow

---

## Author

**Harsitha Koduri**

GitHub: https://github.com/Harsitha2417
