'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductOptionSchema = new Schema({
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
    price_per_qty: {
      Type: Boolean,
      default: false
    },
    values: { //name of option value, price offset eg. [{'color':'blue', 'price': 3.99}, {'color':'pink', 'price': 4.99}, {'color':'white', 'price': -1.99}]
      type: Array     
    },
    select_multiple: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    display_type: {
      type: String,
      default: 'list',
      lowercase: true,
      trim: true
    },
    selected: {
      type: Schema.Types.Mixed
    }
});


/**
 * Validations
 */
ProductOptionSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

ProductOptionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('ProductOption', ProductOptionSchema);

