const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://augusto:augusto@gernte-mxy1c.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true})

app.use(require('./routes'));

app.listen(3333);