const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_DB || 'charades_DEV';

const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.auyhe66.mongodb.net/${dbName}`;

const healthRoutes = require('./routes/health');
const charadeRoutes = require('./routes/charade');

const app = express();

app.use(cors());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log(
      `🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`
    );
  } catch (error) {
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`);
    console.error(error);
  }
};

connectToDatabase();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Charades API!');
});

app.use('/api/v1.0/health', healthRoutes);
app.use('/api/v1.0/charades', charadeRoutes);

module.exports = app;
