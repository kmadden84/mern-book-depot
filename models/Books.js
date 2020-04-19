const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  length: String,
  pubDate: {
    type: Date,
    required: true
  },
  Notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
});
BookSchema.plugin(uniqueValidator);

mongoose.model('Book', BookSchema);