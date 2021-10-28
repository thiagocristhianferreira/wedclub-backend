const createUser = async (req, res, _next) => {
  res.status(200).json({ newRegister: 'result' });
};

const getAllUsers = async (_req, res, _next) => {
  res.status(200).json({ registers: 'result' });
};

const getUserById = async (_req, res, _next) => {
  res.status(200).json({ user: 'result' });
};

const editUserById = async (_req, res, _next) => {
  res.status(200).json({ userEdited: 'result' });
};

const deleteUserById = async (_req, res, _next) => {
  res.status(200).json({ userDeleted: 'result' });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
};