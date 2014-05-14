'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all products', {
                url: '/products',
                templateUrl: 'customproduct/views/product/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create product', {
                url: '/product/create',
                templateUrl: 'customproduct/views/product/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit product', {
                url: '/products/:productId/edit',
                templateUrl: 'customproduct/views/product/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('product by id', {
                url: '/product/:productId',
                templateUrl: 'customproduct/views/product/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }

]);
