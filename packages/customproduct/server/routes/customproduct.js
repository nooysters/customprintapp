'use strict';


var uploads = require('../controllers/service_uploads');
var inkauth = require('../controllers/filepickerauth');
var types = require('../controllers/product_types');
var options = require('../controllers/product_options');
var products = require('../controllers/products');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.product.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Customproduct, app, auth, database) {
    
    // Product Routes.
    app.route('/api/products')
        .get(auth.requiresAdmin, products.all)
        .post(auth.requiresLogin, products.create);
    app.route('/api/products/:productId')
        .get(products.show)
        .put(auth.requiresLogin, hasAuthorization, products.update)
        .delete(auth.requiresLogin, hasAuthorization, products.destroy);
		app.route('/api/productslist')
				.get(auth.requiresLogin, products.allForUser);
		
		//Product Type Admin Routes.
		app.route('/admin/types')
        .get(auth.requiresAdmin, types.all)
        .post(auth.requiresAdmin, types.create);
    app.route('/admin/types/:typeId')
        .get(types.show)
        .put(auth.requiresAdmin, types.update)
        .delete(auth.requiresAdmin, types.destroy);
        
    app.route('/admin/options')
        .get(auth.requiresLogin, auth.requiresAdmin, options.all)
        .post(auth.requiresAdmin, options.create);
    app.route('/admin/options/:optionId')
        .get(auth.requiresLogin, options.show)
        .put(auth.requiresLogin, options.update)
        .delete(auth.requiresAdmin, options.destroy);

		
		// Uploader Routes.
    app.post('/api/upload', function(req, res, next) {
        uploads.upload(req, res);
    });
    app.post('/api/upload_processed', function(req, res, next) {
        uploads.uploadProcess(req, res);
    });
    
    // Get signed policy for ink Uploader
    app.get('/api/filepickauth', function(req, res, next) {
        inkauth.getPolicy(req, res);
    });
    
    // Finish with setting up the productId param
    app.param('productId', products.product);
    app.param('typeId', types.ProductType);
    app.param('optionId', options.ProductOption);

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
