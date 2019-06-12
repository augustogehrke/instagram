//const Post = '../models/Post';

const mongoose = require('mongoose');
const Schema = require('../models/Post');
const Post = mongoose.model('Post', Schema);
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async index(req, res) {
    const data = await Post.find().sort('-createdAt');
    return res.json(data);
  },

  async create(req, res) {
    const {author, place, description, hastags} = req.body;
    const {filename: image} = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(req.file.path).resize(500).jpeg({quality: 70}).toFile(path.resolve(req.file.destination, 'resized', fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hastags,
      image: fileName
    });

    req.io.emit('post', post);

    return res.json(post);
  }
};