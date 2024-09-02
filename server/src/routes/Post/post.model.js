import mongoose from 'mongoose';

let postSchema = new mongoose.Schema({
  description: { type: String, required: true },
  maximumperson: { type: Number, required: true },
  minimumperson: { type: Number, required: true },
  pricebyday: { type: Number, required: true },
  address: { type: Object, required: true },
  title: { type: String, required: true },
  user_post: { type: String, required: true },
  pictures: { type: Array, required: false },
  tags: { type: Array, required: false },
  createdDate: { type: Date, default: Date.now },
  rate: { type: Array, required: false },
});

export const Post = mongoose.model('posts', postSchema);