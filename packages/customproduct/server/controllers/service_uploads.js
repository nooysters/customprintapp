'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Blitline = require('simple_blitline_node');
var blitline = new Blitline();
var applicationID = '1dL456jVtdAlw6nnFW1VmkQ';

/** Helper Functions **/
var setFiles = function(prod, files) {
  var product = prod;

  product.set('files', files);

  product.save(function(err) {
      if (err) {
        console.log(err);
                
      } else {
        console.log('Product files saved for product ' + product._id);
      }
  });
};

/*
var UUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
}
*/
exports.upload = function(req, res) { 
 
   var image = req.body.image;
   
   blitline.addJob({
      'application_id': applicationID,
      'src': req.body.image.url+'?signature='+req.body.auth.signature+'&policy='+req.body.auth.policy,
      'postback_url': 'http://customprint.ngrok.com/api/upload_processed/'+'?productId='+ req.body.params.pid,
      'postback_headers': {
        'pid': req.body.params.pid
      },
      'wait_for_s3': true,
      'pre_process': {
        'move_original': {
            's3_destination': {
                'bucket': 'custom_products',
                'key': 'original_'+ image.filename

            }
        }
      },
      'functions':[ 
        {
          'name': 'resize_to_fit',
          'params': {
              'width': 600,
              'height': 600
          },
          'save': {
            'image_identifier': 'large_' + image.filename,
            's3_destination' : {
              'bucket' : 'custom_products',
              'key' : 'large_' + image.filename
             }
           }
         }
       ]
    });

    blitline.postJobs(function(response) {
      console.log('posting job. Please wait...');
    }); 
};
 
// Gets blitline postback data and saves it to the product.
exports.uploadProcess = function(req, res) {
  var results = JSON.parse(req.body.results);
  if(results.images[0].error) {
		console.log('there was an error processing the file!');
		return;
	}

	var files = req.body;
	var pid = req.query.productId;
		
	var product;
  if(!pid) {
	  product = new Product({title: 'fjidsjf'});
	  product.user = req.user;
	  product.save(function(err) {
      if (err) {
          return res.jsonp('Something went wrong!');
      }
      setFiles(product,files);
		});
  }
  else {
  	Product.load(pid,  function(err, prod) {
	  	if(err) return res.jsonp('Something went wrong!');
	  	setFiles(prod,files);
  	});
  }
};
