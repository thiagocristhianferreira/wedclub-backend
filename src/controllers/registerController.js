const {
  writeUser,
  readUsers,
  getById,
  updateUserById,
} = require('../services/registerService');

const {
  OK,
  Created,
} = require('../utils/success');

const createUser = async (req, res) => {
  const { id, name, email, city, age } = req.body;
  const result = await writeUser({ id, name, email, city, age });
  if (result.error) {
    const { statusCode, message, error } = result;
    return res.status(statusCode).json({ error, message });
  }
  return res.status(Created).json({ newRegister: result });
};

const getAllUsers = async (_req, res) => {
  const result = await readUsers();
  return res.status(OK).json({ registers: result });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await getById(parseInt(id, 10));
  if (!result) {
    const { message, error, statusCode } = result;
    return res.status(statusCode).json({ error, message });
  }
  return res.status(OK).json({ user: result });
};

const editUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, city, age } = req.body;
  const data = await updateUserById(parseInt(id, 10), { name, email, city, age });
  if (data.error) {
    const { message, error, statusCode } = data;
    return res.status(statusCode).json({ error, message });
  }
  const result = await getById(parseInt(id, 10));
  return res.status(OK).json({ userEdited: result });
};

const deleteUserById = async (_req, res) => {
  console.log();
  return res.status(200).json({ userDeleted: 'result' });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
};