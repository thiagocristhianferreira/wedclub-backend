const express = require('express');
const cors = require('cors');

const { registerRoute } = require('./routes');

const app = express();
app.use(express());

app.use(cors());
app.use(express.json());

app.use('/register', registerRoute);

app.all('*', (_req, res) => res.status(404).json({ message: 'Not Found' }));

module.exports = app;