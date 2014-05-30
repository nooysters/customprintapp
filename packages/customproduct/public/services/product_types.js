'use strict';

//Products service used for articles REST endpoint
angular.module('mean').factory('ProductTypes', ['$resource',
	function($resource) {
		return $resource('admin/types/:typeId', {
			typeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},			
		});
	}
]);
