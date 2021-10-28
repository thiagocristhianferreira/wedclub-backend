const boom = require('@hapi/boom');

const {
  addUser,
  getAllUsers,
} = require('../models/registerModel');

const { create } = require('../schemas/registerSchemas');

const writeUser = async ({ name, email, city, age }) => {
  const { error } = create.validate({ name, email, city, age });
  if (error) {
    const errorMessage = error.details[0].message;
    return boom.methodNotAllowed(errorMessage);
  }
  const userList = await getAllUsers();
  const checkExists = userList.some((userRegister) => userRegister.email === email);
  if (checkExists) return boom.conflict('User Already Registered');
  await addUser({ name, email, city, age });
  return { name, email };
};

const readUsers = async () => {
  const data = await getAllUsers();
  return data;
};

module.exports = {
  writeUser,
  readUsers,
};
