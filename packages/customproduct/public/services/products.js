'use strict';

//Articles service used for articles REST endpoint
angular.module('mean').factory('Products', ['$resource',
	function($resource) {
		return $resource('api/products/:productId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
