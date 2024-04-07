const mongoose = require('mongoose'); 

const charadeSchema = mongoose.Schema({ 
  title: { type: String, required: true }, 
  format: [],
});

module.exports = mongoose.model('Charade', charadeSchema); 
