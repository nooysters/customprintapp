'use strict';

angular.module('mean').controller('UploadsController', ['$scope', '$stateParams', '$location', 'Global', 'Products', '$http', '$timeout', '$q',
  function($scope, $stateParams, $location, Global, Products, $http, $timeout, $q) {
    $scope.global = Global;
        
// Load ink file picker script if it is not loaded, non-blocking!  
/* jshint ignore:start */ 
(function(a){if(window.filepicker){return}var b=a.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===a.location.protocol?"https:":"http:")+"//api.filepicker.io/v1/filepicker.js";var c=a.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);var d={};d._queue=[];var e="pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");var f=function(a,b){return function(){b.push([a,arguments])}};for(var g=0;g<e.length;g++){d[e[g]]=f(e[g],d._queue)}window.filepicker=d})(document); 


    $scope.isLoaded = false;
    
    var times = 10; //number of times to attempt to poll for the image. 
    var Pid;
    
    function isImage(src) {
    
        var deferred = $q.defer();
    
        var image = new Image();
        image.onerror = function() {
            deferred.resolve(false);
        };
        image.onload = function() {
            deferred.resolve(true);
        };
        image.src = src;
    
        return deferred.promise;
    }
    
    var times = 10;
    var waitForImage = function(url) {
      $timeout(function(){
        isImage(url).then(function(res) {
          if(res === false) {
            if(times > 0) {
              times--;
              timeouts.push($timeout(function(){waitForImage(url)}, 3000, false));
            }
            else {
              $scope.err = 'The image may need additional processing time. check back later by clicking on my products.' 
            }
          }
          else {
            $location.path('products/' + Pid + '/edit');
          }
        });
      }, 1000, false);
    };
    
    // Upload the image
    var Upload = function(data) {
		  $http.post('/api/upload', data).
			success(function(data, status, headers, config) {	
			  $scope.processingImage = true;
			  var image = data.results[0].images[0];
			  Pid = $stateParams.pid;
			  return waitForImage(image.s3_url);        
  			         
		  }).
		  error(function(data, status, headers, config) {
        console.log(data);
			});
		};
		
	
    (function chkFP() {
      if ( window.filepicker ) {
        $scope.isLoaded = true;
        $scope.err = null;
        // additional picker only options
        var pickerOptions = {
          services:['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'PICASA', 'FLICKR'],
        };
        var storeOptions = {};

        var options = $.extend( true, $scope.defaults, pickerOptions );
        
        // launch picker dialog
        $scope.pickFile = function() {
        // get security policy from server.
				$http({method: 'GET', url: '/api/filepickauth'}).
					success(function(data, status, headers, config) {
						options.policy = data.policy;
						options.signature = data.signature;
						
						filepicker.setKey(data.key);
					
						filepicker.pick(options,
						    function(InkBlob) {
						      var preview = InkBlob.url+'/convert?w=200&h=200&fit=clip&signature='+ data.signature + '&policy='+ data.policy;
						    	$scope.filePreview =  preview;
						      Upload({image:InkBlob, params: $stateParams, auth:data});
						    },
						    function(FPError) {
						    	$scope.err = FPError.toString();
						    }
						 );
						 
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});

        };
        
      } 
      else {
        setTimeout( chkFP, 500 );
      }
    })();
    /* jshint ignore:end */   
    
    
    
  }
  
  

]);
