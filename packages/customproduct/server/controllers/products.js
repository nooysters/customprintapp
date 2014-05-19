'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash');


/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
    Product.load(id, function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error('Failed to load product ' + id));
        req.product = product;
        next();
    });
};

/**
 * Create a product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);
    product.user = req.user;

    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Update a product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Delete a product
 */
exports.destroy = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Show a product
 */
exports.show = function(req, res) {
    res.jsonp(req.product);
};

/**
 * List of products
 */
exports.all = function(req, res) {
    Product.find().sort('-created').populate('user', 'name username').exec(function(err, products) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(products);
        }
    });
};
