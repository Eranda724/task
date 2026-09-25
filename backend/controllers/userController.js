const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/admin/users
async function createStaffUser(req, res) {
    try {
        const { name, email, password, specialty } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'That email is already in use' });

        const hashed = await bcrypt.hash(password, 10);
        let image = '';
        if (req.file) {
            image = '/' + req.file.filename;
        }
        const user = await User.create({ name, email, password: hashed, role: 'staff', specialty, image });

        res.status(201).json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ error: 'Could not create staff account' });
    }
}

// GET /api/admin/users
async function listStaffUsers(req, res) {
    try {
        const users = await User.find().select('name email specialty image isActive role createdAt');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch staff accounts' });
    }
}

async function toggleStaffStatus(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Staff member not found' });
        
        user.isActive = !user.isActive;
        await user.save();
        
        res.json({ id: user._id, isActive: user.isActive });
    } catch (err) {
        res.status(500).json({ error: 'Could not toggle status' });
    }
}

async function getPublicStaff(req, res) {
    try {
        const staff = await User.find({ isActive: true }).select('name specialty image');
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch staff' });
    }
}

module.exports = { createStaffUser, listStaffUsers, toggleStaffStatus, getPublicStaff };