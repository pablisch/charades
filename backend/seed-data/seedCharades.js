const mongoose = require('mongoose');
const Charade = require('../models/charade');
const charadeSeedData = require('./charadeSeedData');
require('dotenv').config();

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_DB;
const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.auyhe66.mongodb.net/${dbName}`;

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log(`🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`);
  } catch (error) {
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`);
    console.error(error);
  }
};

connectToMongoDb();

const clearCharades = async () => {
  await Charade.deleteMany({});
};

const insertCharades = async () => {
  await Charade.insertMany(charadeSeedData);
};

const seedCharades = async () => {
  try {
    await clearCharades();
    await insertCharades();
    console.log('Charade seeding completed successfully.');
  } catch (error) {
    console.error('Charade seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedCharades();
