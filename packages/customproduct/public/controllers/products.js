'use strict';

angular.module('mean').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Global', 'Products', 'ProductTypes',
    function($scope, $stateParams, $location, Global, Products, ProductTypes) {
        $scope.global = Global;

        $scope.create = function() {
            var product = new Products({
                title: this.title,
                content: this.content,
								type: '538f5d625b81020706914338'
            });
            product.$save(function(response) {
                $location.path('products/' + response._id + '/edit');
            });

            this.title = '';
            this.content = '';
        };

        $scope.remove = function(product) {
            if (product) {
                product.$remove();

                for (var i in $scope.products) {
                    if ($scope.products[i] === product) {
                        $scope.products.splice(i, 1);
                    }
                }
            } else {
                $scope.product.$remove();
                $location.path('products');
            }
        };

        $scope.update = function() {
            var product = $scope.product;
            if (!product.updated) {
                product.updated = [];
            }
            product.updated.push(new Date().getTime());

            product.$update(function() {
                $location.path('products/' + product._id);
            });
        };

        $scope.findByUser = function() {
            Products.allForUser(function(products) {
                $scope.products = products;
            });
        };
				
		
				$scope.find = function() {
            Products.query(function(products) {
                $scope.products = products;
            });
        };

        $scope.findOne = function() {
            Products.get({
                productId: $stateParams.productId,
            }, function(product) {
                $scope.product = product;
            });
        };
    }
]);
