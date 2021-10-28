const { MongoClient } = require('mongodb');

// URL MONGO LOCAL
const MONGO_DB_URL = 'mongodb://localhost:27017/WedClubUsers';

const DB_NAME = 'WedClubUsers';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;
