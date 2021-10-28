// const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const NAME_COLLECTION = 'Users';

const addUser = async ({ name, email, city, age }) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .insertOne({ name, email, city, age });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const db = await connection();
    return await db.collection(NAME_COLLECTION).find().toArray();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
