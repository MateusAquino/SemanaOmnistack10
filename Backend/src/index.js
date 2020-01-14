const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

const username = 'Mateus', password = '****';

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-r0y7f.mongodb.net/week10?retryWrites=true&w=majority`,  {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });

app.use(express.json());
app.use('/api', routes);
app.listen(3333);