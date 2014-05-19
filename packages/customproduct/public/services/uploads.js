'use strict';

//Uploads service used for articles REST endpoint
angular.module('mean').factory('Uploads', ['$resource',
	function($resource) {
		return $resource('api/upload', {
			productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
