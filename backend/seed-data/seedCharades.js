const mongoose = require('mongoose');
const Charade = require('../models/charade');
const charadeSeedData = require('./charadeSeedData');
require('dotenv').config();

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_DB;
const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.auyhe66.mongodb.net/${dbName}`;

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(`🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`);
  })
  .catch((error) => {
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`);
    console.error(error);
  });

const clearCharades = async () => {
  await Charade.deleteMany({});
};

const insertCharades = async () => {
  await Charade.insertMany(charadeSeedData);
};

// for TEST db => npm run seed:charades:test
// for dev/production db => npm run seed:charades
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
