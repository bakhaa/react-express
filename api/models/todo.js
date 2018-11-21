import mongoose from '../lib/mongoose';

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const todoSchema = new Schema({
  text: { type: String, required: true },
  description: { type: String, default: '' },
  user: { type: ObjectId, ref: 'User', required: true },
  completed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', todoSchema);
