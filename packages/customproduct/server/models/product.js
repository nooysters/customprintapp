'use strict';

/**
 * Module dependencies.
 */
require('../models/product_type');
var mongoose = require('mongoose'),
    //TypeSchema = mongoose.model('ProductType').schema,
    Schema = mongoose.Schema;
    
/**
 * File Schema
 */
var FileSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    filename: {
        type: String,
        default: '',
        trim: true
    },
    filemime: {
        type: String,
        default: '',
        trim: true
    },
    filepath: {
        type: String,
        default: '',
        trim: true
    },
    filesize: {
        type: String,
        default: '',
        trim: true
    },
    pixel_width: {
      type: Number,
      max: 999999,
      default: 0,
    },
    pixel_height: {
      type: Number,
      max: 999999,
      default: 0,
    },
    style_id: {
        type: String,
        default: 'original',
        trim: true
    },
    status: {
      type: String,
      default: 'incomplete',
      trim: true
    }
},{strict:false});


/**
 * Product Schema
 */
var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    type_values: {
      type: Schema.Types.Mixed
    },
    selected_options: {
      type: Schema.Types.Mixed
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    files: [FileSchema]
});

/**
 * Validations
 */
ProductSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ProductSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Product', ProductSchema);

