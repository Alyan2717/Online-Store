const User = require('../model/user');
const bcrypt = require('bcryptjs');

async function createUser({ name, email, password, role = 'user', address = '' }) {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 400;
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email: email.toLowerCase(), passwordHash, role, address });
  await user.save();
  return user;
}

async function findByEmail(email) {
  return User.findOne({ email: email.toLowerCase() });
}

async function findById(id) {
  return User.findById(id);
}

async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.passwordHash);
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  verifyPassword
};