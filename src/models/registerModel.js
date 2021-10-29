const connection = require('../connection/connection');

const NAME_COLLECTION = 'Users';

const getAllUsers = async () => {
  try {
    const db = await connection();
    return await db.collection(NAME_COLLECTION).find().toArray();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const addUser = async ({ ID, name, email, city, age }) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .insertOne({
        userId: parseInt(ID, 10),
        name,
        email,
        city,
        age,
      });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const getUserByUserId = async (id) => { 
  try {
    const user = await connection().then((db) => db
        .collection(NAME_COLLECTION)
        .findOne({ userId: id }));
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const userUpdate = async (id, { name, email, city, age }) => {
  try {
    const user = await connection().then((db) => db
        .collection(NAME_COLLECTION)
        .updateOne({ userId: id }, { $set: { name, email, city, age } }));
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const userDelete = async (id) => {
  try {
    const user = await connection().then((db) => db
        .collection(NAME_COLLECTION)
        .deleteOne({ userId: id }));
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserByUserId,
  userUpdate,
  userDelete,
};
