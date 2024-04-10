const Charade = require('../models/charade');

exports.getAllCharades = (req, res, next) => {
  Charade.find()
    .then((charades) => res.status(200).json(charades))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getAllTitlesAndFormats = (req, res, next) => {
  Charade.find({}, { _id: 0, title: 1, format: 1 }) // Does not return _id or __v properties
    .then((charades) => res.status(200).json(charades))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.addCharade = (req, res, next) => {
  console.log('you have reached the addCharade controller');
  const { title, format } = req.body;
  console.log('title:', title, '& formats:', format);
  const charade = new Charade({
    title,
    format
  });
  charade
    .save()
    .then(() => res.status(201).json({ message: 'Charade saved successfully!' }))
    .catch((error) => res.status(400).json({ error: error }));
};

// exports.getSingleCharade = (req, res, next) => {
//   Charade.findOne({ _id: req.params.id })
//     .then((charade) => res.status(200).json(charade))
//     .catch((error) => res.status(404).json({ error: error }));
// };

// exports.deleteCharade = (req, res, next) => {
//   Charade.findOne({ _id: req.params.id }).then((charade) => {
//     if (!charade) {
//       return res.status(404).json({ error: 'Charade not found!' });
//     }
//     Charade.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Deleted!' }))
//       .catch((error) =>
//         res.status(400).json({
//           error: error,
//         })
//       );
//   });
// };

// exports.addComment = (req, res, next) => {
//   const id = req.params.id;
//   const { commentToAdd } = req.body;
//   Charade.findOne({ _id: id }).then((charade) => {
//     if (!charade) {
//       return res.status(404).json({ error: 'Charade not found!' });
//     }
//     charade.comments.push(commentToAdd);
//     charade
//       .save()
//       .then(() => res.status(201).json({ message: 'Comment added!' }))
//       .catch((error) =>
//         res.status(400).json({
//           error: error,
//         })
//       );
//   });
// };

// exports.likeCharade = (req, res, next) => {
//   const id = req.params.id;
//   const { likes } = req.body;
//   Charade.findOne({ _id: id }).then((charade) => {
//     if (!charade) {
//       return res.status(404).json({ error: 'Charade not found!' });
//     }
//     charade.likes = likes;
//     charade
//       .save()
//       .then(() => res.status(201).json({ message: 'Liked/unliked' }))
//       .catch((error) =>
//         res.status(400).json({
//           error: error,
//         })
//       );
//   });
// };
