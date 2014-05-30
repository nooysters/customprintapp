'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ProductOption = mongoose.model('ProductOption'),
    _ = require('lodash');


/**
 * Find ProductOption by id
 */
exports.ProductOption = function(req, res, next, id) {
    ProductOption.load(id, function(err, ProductOption) {
        if (err) return next(err);
        if (!ProductOption) return next(new Error('Failed to load ProductOption ' + id));
        req.ProductOption = ProductOption;
        next();
    });
};

/**
 * Create a ProductOption
 */
exports.create = function(req, res) {


    var option = new ProductOption(req.body);
   //  ProductOption.user = req.user;

    option.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ProductOption: option
            });
        } else {
            res.jsonp(option);
        }
    });
};

/**
 * Update a ProductOption
 */
exports.update = function(req, res) {
    var option = req.ProductOption;

    option = _.extend(option, req.body);

    option.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ProductOption: option
            });
        } else {
            res.jsonp(option);
        }
    });
};

/**
 * Delete a ProductOption
 */
exports.destroy = function(req, res) {
    var option = req.ProductOption;

    option.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ProductOption: option
            });
        } else {
            res.jsonp(option);
        }
    });
};

/**
 * Show a ProductOption
 */
exports.show = function(req, res) {
    res.jsonp(req.ProductOption);
};

/**
 * List of ProductOptions
 */
exports.all = function(req, res) {
    ProductOption.find().sort('-created').populate('user', 'name username').exec(function(err, ProductOptions) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(ProductOptions);
        }
    });
};

