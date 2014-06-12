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
var setFiles = function(product, files) {
  product.set('files', files);

  product.save(function(err) {
      if (err) {
        console.log(err);       
      } else {
        console.log('Product files saved for product ' + product._id);
				return product;
      }
  });
};

var UUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
};

var getExtension = function(name) {
	var re = /(?:\.([^.]+))?$/;
	return re.exec(name)[1];
};

exports.upload = function(req, res) { 
 
   var image = req.body.image;
	 var extension = getExtension(image.filename); 
	 var newName = UUID() + '.' + extension;

   blitline.addJob({
      'application_id': applicationID,
      'src': req.body.image.url+'?signature='+req.body.auth.signature+'&policy='+req.body.auth.policy,
      'postback_url': 'http://customprint.ngrok.com/api/upload_processed/'+'?productId='+ req.body.params.pid,
      'postback_headers': {
        'pid': req.body.params.pid,
				'original_link': 'http://s3.amazonaws.com/custom_products/' + newName
      },
      'wait_for_s3': true,
      'pre_process': {
        'move_original': {
            's3_destination': {
                'bucket': 'custom_products',
                'key': newName
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
              'key' : 'large_' + newName
             }
           }
         }
       ]
    });

    blitline.postJobs(function(response) {
      console.log('posting job. Please wait...');
      return res.jsonp(response); 
    }); 
};
 
// Gets blitline postback data and saves it to the product.
exports.uploadProcess = function(req, res) {
  var results = JSON.parse(req.body.results);
	var errors;
	
  if(results.images[0].error) {
		errors = 'there was an error processing the file!';
	}
	
	var files = results;
	var pid = req.query.productId;
	//files.original_meta.url = req.params.original_link;
	
	var product;
  if(!pid) {
	  product = new Product({title: 'fjidsjf'});
	  product.user = req.user;
	  product.save(function(err) {
      if (err) {
         errors = 'Something went wrong!';
      }
      setFiles(product,files);
		});
  }
  else {
  	Product.load(pid,  function(err, prod) {
	  	if(err) errors = 'Something went wrong!';
			if(prod) setFiles(prod,files);
			else errors = 'Product Undefined';
  	});
  }
	if(errors) {
		console.log(errors);
		return res.jsonp(errors); 
	}
};
