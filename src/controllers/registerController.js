const {
  writeUser,
  readUsers,
  getById,
} = require('../services/registerService');

const {
  OK,
  Created,
} = require('../utils/success');

const createUser = async (req, res, _next) => {
  const { id, name, email, city, age } = req.body;
  const result = await writeUser({ id, name, email, city, age });
  if (result.error) {
    const { statusCode, message, error } = result;
    return res.status(statusCode).json({ error, message });
  }
  return res.status(Created).json({ newRegister: result });
};

const getAllUsers = async (_req, res, _next) => {
  const result = await readUsers();
  return res.status(OK).json({ registers: result });
};

const getUserById = async (req, res, _next) => {
  const { id } = req.params;
  const result = await getById(parseInt(id, 10));
  if (result.error) {
    const { message, error, statusCode } = result;
    return res.status(statusCode).json({ error, message });
  }
  return res.status(OK).json({ user: result });
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