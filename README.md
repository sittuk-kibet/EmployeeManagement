
## Employee Management System

A simple employee management system that allows users to view, add, update, and delete employees. This system uses Node.js, Express, MySQL, and a frontend built with HTML, CSS, and JavaScript.

---

## Features
- **Add new employees** to the system
- **View all employees**
- **Update employee details**
- **Delete employees**

---

## Tech Stack
- **Backend**: Node.js, Express, MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL
- **Session Management**: MySQL sessions with express-session

---

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js**
- **MySQL**
- **Git**

---

### Installation

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <your-project-directory>
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file** in the root of the project directory and add the following environment variables:

    ```plaintext
    DB_HOST=localhost
    DB_USER=your-db-username
    DB_PASSWORD=your-db-password
    DB_NAME=employee_db
    DB_PORT=3306
    SESSION_SECRET=your-session-secret
    ```

    Replace the values with your actual MySQL database credentials and session secret.

5. **Set up the MySQL database:**

    Create a database in MySQL with the name `employee_db` (or whatever name you prefer).

    Create the employees table with the following structure:

    ```sql
    CREATE TABLE employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        date_hired DATE NOT NULL
    );
    ```

---

## Running the Application

1. **Start the server:**

    ```bash
    npm start
    ```

    The server will be running at `http://localhost:4000`.

2. Open the `index.html` file in your browser to interact with the employee management system.

---

## API Endpoints

### `GET /api/employees/all`
Fetch all employees

### `POST /api/employees/add`
Add a new employee

### `PUT /api/employees/update/:id`
Update an employee's details

### `DELETE /api/employees/delete/:id`
Delete an employee

---

## Example cURL Requests

### Add a new employee:

```bash
curl -X POST http://localhost:4000/api/employees/add -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","position":"Developer","department":"IT"}'
