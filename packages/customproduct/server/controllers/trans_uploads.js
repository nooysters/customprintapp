'use strict';
//var transloadit = require('node-transloadit');

var mongoose = require('mongoose'),
    Product = mongoose.model('Product');
   // _ = require('lodash');
    


//var client = new transloadit('bd019f30dd2711e388eb4f30d1043e5b', 'secret3c450e5f5308f73e70003250fa7f908673ed6276');



exports.upload = function(req, res) {
  //var params = req.params;
  var product = new Product({title: 'fjidsjf'});
  product.user = req.user;
  /*product.files[0] = {
   filename: 'test'
  };*/
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
  /*
  client.send(params, function(ok) {
    
     var product = Product.find({'_id': req.product});
     /*product.files[0] = {
       filename: 'test'
     };
     product.save();
     
     console.log('Success: ' + JSON.stringify(ok));
  }, function(err) {
      // error callback [optional]
      console.log('Error: ' + JSON.stringify(err));
  });
  */
};