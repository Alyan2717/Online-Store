const { validationResult } = require('express-validator');
const { generateToken } = require('../util/generateToken');
const authService = require('../service/authService');


async function signup(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password } = req.body;
        const user = await authService.createUser({ name, email, password, role: 'user' });

        // Optionally auto-login after signup: generate token
        const token = generateToken(user);
        res.status(201).json({ message: 'User registered', token, user: user.toJSON() });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;
        const user = await authService.findByEmail(email);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await authService.verifyPassword(user, password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ token, user: user.toJSON() });
    } catch (err) {
        next(err);
    }
}

async function me(req, res) {
    res.json({
        id: req.user.id,
        role: req.user.role,
        email: req.user.email
    });
};

module.exports = {
    signup,
    login,
    me
};