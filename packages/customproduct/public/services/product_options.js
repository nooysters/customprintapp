'use strict';

//Products service used for articles REST endpoint
angular.module('mean').factory('ProductOptions', ['$resource', '$rootScope', 
	function($resource, $rootScope) {
	
	  var passedOptions = [];
		var resource = $resource('admin/options/:optionId', {
  			optionId: '@_id',
  		}, {
  			update: {
  				method: 'PUT'
  			},			
  		});
		
		return {
  		$resource: resource,
  		addOption: function(option) {
  		    passedOptions.push(option);
  		},
  		getoptions: function(option) {
    		return passedOptions;
  		},
  		passOption: function(option) {
    		$rootScope.$broadcast('PASSOPTION', option);
  		}    
		};
	}
]);
