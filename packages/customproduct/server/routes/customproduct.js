'use strict';

var products = require('../controllers/products');
var uploads = require('../controllers/trans_uploads');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.product.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Customproduct, app, auth, database) {
    
    app.route('/api/products')
        .get(products.all)
        .post(auth.requiresLogin, products.create);
    app.route('/api/products/:productId')
        .get(products.show)
        .put(auth.requiresLogin, hasAuthorization, products.update)
        .delete(auth.requiresLogin, hasAuthorization, products.destroy);

    // Finish with setting up the productId param
    app.param('productId', products.product);
 

    app.post('/api/upload', function(req, res, next) {
        uploads.upload(req, res);
    });
    
/*
    app.get('/api/customproduct', function(req, res, next) {
        res.send('get all products');
    });

    app.get('/api/customproduct/:product_id', function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/customproduct/example/render', function(req, res, next) {
        Customproduct.render('index', {
            package: 'customproduct'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
    */
};
