const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

// Query: req.query
// Route: req.params
// Body : req.body


routes

    // DEVS Endpoint
    .get('/devs', DevController.index)
    .post('/devs', DevController.create)
    .get('/devs/:github', DevController.read)
    .put('/devs/:github', DevController.update)
    .delete('/devs/:github', DevController.delete)

    // SEARCH Endpoint
    .get('/search', SearchController.index);

module.exports = routes;