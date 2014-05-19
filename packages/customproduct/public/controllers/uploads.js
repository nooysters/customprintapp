'use strict';

angular.module('mean').controller('UploadsController', ['$scope', '$stateParams', '$location', 'Global', 'Products', 'Uploads',
  function($scope, $stateParams, $location, Global, Products, Uploads) {
    $scope.global = Global;
        
// Load ink file picker script if it is not loaded, non-blocking!   
(function(a){if(window.filepicker){return;}var b=a.createElement('script');b.type='text/javascript';b.async=!0;b.src=('https:'===a.location.protocol?'https:':'http:')+'//api.filepicker.io/v1/filepicker.js';var c=a.getElementsByTagName('script')[0];c.parentNode.insertBefore(b,c);var d={};d._queue=[];var e='pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane'.split(',');var f=function(a,b){return function(){b.push([a,arguments]);};};for(var g=0;g<e.length;g++){d[e[g]]=f(e[g],d._queue);}window.filepicker=d;})(document); 

    $scope.isLoaded = false;
    
    /* jshint ignore:start */  
    (function chkFP() {
      if ( window.filepicker ) {
        filepicker.setKey('Aml0dm6FQ9OUCDMqUFq19z');
        $scope.isLoaded = true;
        $scope.err = null;
        // additional picker only options
        var pickerOptions = {
          services:['COMPUTER', 'FACEBOOK', 'GMAIL', 'INSTAGRAM', 'PICASA', 'FLICKR']
        };
        var storeOptions = {};

        var options = $.extend( true, $scope.defaults, pickerOptions );
        
        // launch picker dialog
        $scope.pickFile = function() {
          filepicker.pick(options, storeOptions,
              function(InkBlobs){
                Uploads.upload(InksBlobs);
              },
              function(FPError){
                $scope.err = FPError.toString();
            }
          );
        }
        
      } 
      else {
        setTimeout( chkFP, 500 );
      }
    })();
    /* jshint ignore:end */   
    
  }
]);
