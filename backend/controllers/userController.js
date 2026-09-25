const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/admin/users
async function createStaffUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'That email is already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role: 'admin' });

        res.status(201).json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ error: 'Could not create staff account' });
    }
}

// GET /api/admin/users
async function listStaffUsers(req, res) {
    try {
        const users = await User.find().select('name email createdAt');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch staff accounts' });
    }
}

module.exports = { createStaffUser, listStaffUsers };