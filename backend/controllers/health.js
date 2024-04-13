const Health = require('../models/health');

exports.getHealth = (req, res, next) => {
  try {
    res.status(200).json({message: "All is good with the server but I can't speak for the database."});
  } catch (error) {
    next(error);
  }
};

exports.getHealthEntry = async (req, res, next) => {
  try {
    const healthEntry = await Health.findOne({ status: "all good" });
    res.status(200).json(healthEntry);
  } catch (error) {
    next(error);
  }
};

exports.addHealthEntry = async (req, res, next) => {
  const { status } = req.body;
  const healthEntry = new Health({
    status
  });
  try {
    const savedEntry = await healthEntry.save();
    res.status(201).json({ message: 'Health entry added successfully!', entry: savedEntry});
  } catch (error) {
    next(error);
  }
}; 
