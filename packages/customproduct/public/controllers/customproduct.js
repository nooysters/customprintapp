'use strict';

angular.module('mean').controller('CustomproductController', ['$scope', 'Global',
    function($scope, Global, Customproduct) {
        $scope.global = Global;
        $scope.customproduct = {
            name: 'customproduct'
        };
    }
]);
