const express = require('express');
const routes = new express.Router();

const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const PostController = require('./controllers/PostController');

routes.get('/posts', PostController.index);

routes.post('/posts', upload.single('image'), PostController.create);

module.exports = routes;