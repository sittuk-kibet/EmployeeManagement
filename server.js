const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
});


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});


// middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'process.env.SESSION_SECRET,',
    resave: false,
    saveUninitialized: true,
}));
// routes
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
/// start server
const port  = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
