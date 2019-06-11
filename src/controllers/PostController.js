//const Post = '../models/Post';

const mongoose = require('mongoose');
const Schema = require('../models/Post');
const Post = mongoose.model('Post', Schema);

module.exports = {
  async index(req, res) {
    const data = await Post.find().sort('-createdAt');
    return res.json(data);
  },

  async create(req, res) {
    const {author, place, description, hastags} = req.body;
    const {filename: image} = req.file;

    const post = await Post.create({
      author,
      place,
      description,
      hastags,
      image
    });

    return res.json(post);
  }
};