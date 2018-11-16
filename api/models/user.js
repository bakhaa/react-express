import mongoose from '../lib/mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
