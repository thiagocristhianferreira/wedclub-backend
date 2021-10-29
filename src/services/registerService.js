const boom = require('@hapi/boom');
const gm = require('gm');

const {
  addUser,
  getAllUsers,
  getUserByUserId,
  userUpdate,
  userDelete,
  uploadImageById,
} = require('../models/registerModel');

const {
  create,
} = require('../schemas/registerSchemas');

const checkParameters = async ({ name, email, city, age }) => {
  const { error } = create.validate({ name, email, city, age });
  if (error) {
    const errorMessage = error.details[0].message;
    return boom.methodNotAllowed(errorMessage);
  }
};

const writeUser = async ({ name, email, city, age }) => {
  await checkParameters({ name, email, city, age });
  const userList = await getAllUsers();
  let ID = userList.length + 1;
  if (userList) {
    const lastIndex = userList.length - 1;
    ID = userList[lastIndex].userId + 1;
  }
  const checkExists = userList.some((userRegister) => userRegister.email === email);
  if (checkExists) return boom.conflict('User Already Registered').output.payload;
  await addUser({ ID, name, email, city, age });
  return { name, email };
};

const readUsers = async () => {
  const data = await getAllUsers();
  return data;
};

const getById = async (id) => {
  const userExists = await getUserByUserId(id);
  if (!userExists) {
    return boom.badRequest(`Not Found Id: ${id}`).output.payload;
  }
  return userExists;
};

const updateUserById = async (id, { name, email, city, age }) => {
  const result = await checkParameters({ name, email, city, age });
  if (!result) {
    await userUpdate(id, { name, email, city, age });
  }
  return getById(id);
};

const removeUserById = async (id) => {
  const getUser = await getById(id);
  if (getUser.error) {
    return boom.badRequest(`Not Found Id: ${id}`).output.payload;
  }
  return userDelete(id);
};

const uploadImage = async (id, path) => {
  const userExists = await getUserByUserId(id);
  if (!userExists) {
    return boom.badRequest(`Not Found Id: ${id}`).output.payload;
  }
  const resize = gm(path).resize(200, 200, '!');
  const quality = gm(path).quality(70);
  return uploadImageById(id, path) && resize && quality;
};

module.exports = {
  writeUser,
  readUsers,
  getById,
  updateUserById,
  removeUserById,
  uploadImage,
};
