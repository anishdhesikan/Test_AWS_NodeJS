// server.js

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

var Bear = require('./app/models/product');

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});



router.route('/products')

    // create a product (accessed at POST http://localhost:8080/api/products)
    .post(function(req, res) {
        
        var product = new Bear();      // create a new instance of the Bear model
        product.name = req.body.name;  // set the products name (comes from the request)

        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product created!' });
        });
        
    })

    // get all the products (accessed at GET http://localhost:8080/api/products)
    .get(function(req, res) {
        Bear.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });



// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/products/:product_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/products/:product_id)
    .get(function(req, res) {
        Bear.findById(req.params.product_id, function (err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    })

// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/change_billboard/:billboard_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/products/:product_id)
    .get(function (req, res) {
        Bear.findById(10, function (err, product) {
            if (err)
                res.send(err);
            product.billboard_id = req.params.billboard_id;

        });
    })


    // update the product with this id (accessed at PUT http://localhost:8080/api/products/:product_id)
    .put(function (req, res) {

        // use our product model to find the product we want
        Bear.findById(req.params.product_id, function (err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name;  // update the products info

            // save the product
            product.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);