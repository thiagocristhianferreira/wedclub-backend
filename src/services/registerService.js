const {
  addUser,
  findAllUsers,
} = require('../models/registerModel');

const writeUser = async ({ name, email, city, age }) => {
  await addUser({ name, email, city, age });
  
  const data = { name, email };
  return data;
};

const readUsers = async () => {
  const data = await findAllUsers();
  return data;
};

module.exports = {
  writeUser,
  readUsers,
};
