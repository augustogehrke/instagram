const express = require('express');
const routes = new express.Router();

const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

routes.get('/posts', PostController.index);

routes.post('/posts', upload.single('image'), PostController.create);

routes.post('/posts/:id/like', LikeController.create);

module.exports = routes;