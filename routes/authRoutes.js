const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/connection');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ message: 'Admin registered' });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admins WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, results[0].password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

        req.session.user = results[0];
        res.json({ message: 'Logged in' });
    });
});

module.exports = router;
