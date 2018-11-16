import mongoose from '../lib/mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema({
  text: { type: String, required: true },
  descripiton: { type: String, default: '' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', todoSchema);
