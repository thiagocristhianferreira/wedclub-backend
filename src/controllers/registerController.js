const {
  writeUser,
  readUsers,
} = require('../services/registerService');

const {
  OK,
  Created,
} = require('../utils/success');

const createUser = async (req, res, _next) => {
  const { name, email, city, age } = req.body;

  const result = await writeUser({ name, email, city, age });

  if (result.output) {
    const { statusCode, message, error } = result.output.payload;
    return res.status(statusCode).json({ error, message });
  }
  
  

  return res.status(Created).json({ newRegister: result });
};

const getAllUsers = async (_req, res, _next) => {
  const result = await readUsers();

  return res.status(200).json({ registers: result });
};

const getUserById = async (_req, res, _next) => {
  return res.status(200).json({ user: 'result' });
};

const editUserById = async (_req, res, _next) => {
  return res.status(200).json({ userEdited: 'result' });
};

const deleteUserById = async (_req, res, _next) => {
  return res.status(200).json({ userDeleted: 'result' });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
};