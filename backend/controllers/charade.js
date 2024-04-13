const Charade = require('../models/charade');

exports.getAllCharades = async (req, res, next) => {
  try {
    const charades = await Charade.find();
    res.status(200).json(charades);
  } catch (error) {
    next(error);
  };
};

exports.getAllTitlesAndFormats = async (req, res, next) => {
  try {
    const charades = await Charade.find({}, { _id: 0, title: 1, format: 1 });
    res.status(200).json(charades);
  } catch (error) {
    next(error);
  }
};

exports.addCharade = async (req, res, next) => {
  const { title, format } = req.body;
  console.log('New charade data... title:', title, '& formats:', format);
  const charade = new Charade({
    title,
    format
  });
  try {
    const savedCharade = await charade.save();
    res.status(201).json({ message: 'Charade saved successfully!', charade: savedCharade });
  } catch (error) {
    next(error);
  }
};

// exports.getSingleCharade = async (req, res, next) => {
//   try {
//     const charade = await Charade.findOne({ _id: req.params.id });
//     res.status(200).json(charade);
//   } catch (error) {
//     next(error);
//   }
// }

// exports.deleteCharade = async (req, res, next) => {
//   try {
//     const charade = await Charade.findOne({ _id: req.params.id });
//     if (!charade) {
//       return res.status(404).json({ error: 'Charade not found!' });
//     }
//     await Charade.deleteOne({ _id: req.params.id });
//     res.status(200).json({ message: 'Deleted!' });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.updateCharade = async (req, res, next) => {
//   try {
//     const charade = await Charade.findOne({ _id: req.params.id });
//     if (!charade) {
//       return res.status(404).json({ error: 'Charade not found!' });
//     }
//     const { title, format } = req.body;
//     charade.title = title;
//     charade.format = format;
//     const updatedCharade = await charade.save();
//     res.status(200).json({ message: 'Charade updated successfully!', charade: updatedCharade });
//   } catch (error) {
//     next(error);
//   }
// }
