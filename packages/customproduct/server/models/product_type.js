'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Product Type Schema
 */
var ProductTypeSchema = new Schema({
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
    image_file_name: {
        type: String,
        default: '',
        trim: true
    },
    weight: {
        type: Number,
        default: 0,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    type_options: [{
      type: Schema.Types.ObjectId, 
      ref:'ProductOption'
    }],
    
});

/**
 * Validations
 */
ProductTypeSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Middleware
 */
ProductTypeSchema.pre('save', function(next){
  this.type_options = this.type_options.map(function(option) { return option._id; });
  next();
});

/**
 * Statics
 */
ProductTypeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('type_options').exec(cb);
};

mongoose.model('ProductType', ProductTypeSchema);

