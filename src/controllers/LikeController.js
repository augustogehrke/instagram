//const Post = '../models/Post';

const mongoose = require('mongoose');
const Schema = require('../models/Post');
const Post = mongoose.model('Post', Schema);

module.exports = {
  async create(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  }
};