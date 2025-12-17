const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/authController');
const { verifyToken } = require('../util/generateToken');

const router = express.Router();

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
router.post('/signup',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  authController.signup
);

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  authController.login
);

router.get('/me', verifyToken, authController.me);

module.exports = router;