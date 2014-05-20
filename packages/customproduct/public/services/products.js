'use strict';

//Products service used for articles REST endpoint
angular.module('mean').factory('Products', ['$resource',
	function($resource) {
		return $resource('api/products/:productId', {
			productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
