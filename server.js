const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const MYSQLStore = require('express-mysql-session')(session);
require('dotenv').config();


// Initialize express app
const app = express();

// Configure MySQL session store
const sessionStore = new MYSQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '', // Explicitly set to empty for passwordless connection
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Secret key for signing session cookies
        resave: false,
        saveUninitialized: false,
        store: sessionStore, // Store session data in MySQL
    })
);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Import and use routes
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/employees', employeeRoutes);  // This ensures your routes work under /api/employees path
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
