const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Create Employee
router.post('/add', (req, res) => {
    const { name, email, position, department } = req.body;
    const sql = 'INSERT INTO employees (name, email, position, department, date_hired) VALUES (?, ?, ?, ?, CURDATE())';
    db.query(sql, [name, email, position, department], (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ message: 'Employee added', employeeId: result.insertId });
    });
});

// Get All Employees
router.get('/all', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// Update Employee
router.put('/update/:id', (req, res) => {
    const { name, email, position, department } = req.body;
    const sql = 'UPDATE employees SET name = ?, email = ?, position = ?, department = ? WHERE id = ?';
    db.query(sql, [name, email, position, department, req.params.id], (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ message: 'Employee updated' });
    });
});

// Delete Employee
router.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Employee deleted' });
    });
});

module.exports = router;
