const mongoose= require("mongoose")

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, enum: ['Laptop', 'Tablet', 'Mobile'], required: true },
    no_of_comments: { type: Number, required: true, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  const Post = mongoose.model('Post', postSchema);
  module.exports={Post}