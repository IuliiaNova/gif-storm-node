const { Schema, model } = require('mongoose');

const ContentSchema = new Schema({
  userId: String,
  name: String,
  url: String, 
  type: String,
  genre: String
}, {
  timestamps: true
});

const ContentModel = model('Content', ContentSchema);

module.exports = ContentModel;