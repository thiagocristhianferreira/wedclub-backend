const boom = require('@hapi/boom');

const {
  addUser,
  getAllUsers,
  getUserByUserId,
} = require('../models/registerModel');

const { create } = require('../schemas/registerSchemas');

const writeUser = async ({ id, name, email, city, age }) => {
  const { error } = create.validate({ name, email, city, age });
  if (error) {
    const errorMessage = error.details[0].message;
    return boom.methodNotAllowed(errorMessage);
  }
  const userList = await getAllUsers();
  const checkExists = userList.some((userRegister) => userRegister.email === email);
  if (checkExists) return boom.conflict('User Already Registered').output.payload;
  await addUser({ id, name, email, city, age });
  return { name, email };
};

const readUsers = async () => {
  const data = await getAllUsers();
  return data;
};

const getById = async (id) => {
  const userExists = await getUserByUserId(id);
  // console.log(userExists);
  if (!userExists) {
    return boom.badRequest(`Not Found Id: ${id}`).output.payload;
  }
  return userExists;
  // try {
  // } catch (err) {
  // }
};

module.exports = {
  writeUser,
  readUsers,
  getById,
};
