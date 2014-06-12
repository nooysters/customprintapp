'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ProductType = mongoose.model('ProductType'),
    _ = require('lodash');




/**
 * Find ProductType by id
 */
exports.ProductType = function(req, res, next, id) {
    ProductType.load(id, function(err, ProductType) {
        if (err) return next(err);
        if (!ProductType) return next(new Error('Failed to load ProductType ' + id));
        req.ProductType = ProductType;
        next();
    });
};

/**
 * Create a ProductType
 */
exports.create = function(req, res) {

    var type = new ProductType(req.body);

    type.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ProductType: type
            });
        } else {
            res.jsonp(type);
        }
    });
};

/**
 * Update a ProductType
 */
exports.update = function(req, res) {
    var type = req.ProductType;
    type = _.extend(type, req.body);

    type.save(function(err) {
        if (err) {
        console.log(err);
            return res.send('users/signup', {
                errors: err.errors,
                ProductType: type
            });
        } else {
          res.jsonp(type);
         
        }
    });
};

/**
 * Delete a ProductType
 */
exports.destroy = function(req, res) {
    var type = req.ProductType;

    type.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ProductType: type
            });
        } else {
            res.jsonp(type);
        }
    });
};

/**
 * Show a ProductType
 */
exports.show = function(req, res) {
    res.jsonp(req.ProductType);
};

/**
 * List of ProductTypes
 */
exports.all = function(req, res) {
    ProductType.find().sort('-created').populate('user', 'name username').exec(function(err, ProductTypes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(ProductTypes);
        }
    });
};

