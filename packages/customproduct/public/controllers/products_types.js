'use strict';

angular.module('mean').controller('ProductTypesController', ['$scope', '$stateParams', '$location', 'Global', 'ProductTypes',
    function($scope, $stateParams, $location, Global, ProductTypes) {
        $scope.global = Global;
        
        $scope.$on('PASSOPTION', function(event, response) {
          var len = $scope.type.type_options.length;
          for(var i=0; i<len; i++) {
            if($scope.type.type_options[i]._id === response._id) {
              $scope.message = 'option already added to this type.'; 
              return;
            }
          }
          $scope.message = 'added option.';
          $scope.type.type_options.push(response);
        });
        
        $scope.removeTypeOption = function(index) {
           $scope.type.type_options.splice(index, 1);
        };
        
        $scope.create = function() {
            var type = new ProductTypes({
                title: this.title,
                content: this.content
            });
            type.$save(function(response) {
                $location.path('/admin/types/' + response._id + '/edit');
            });

            this.title = '';
            this.content = '';
        };

        $scope.remove = function(type) {
            if (type) {
                type.$remove();

                for (var i in $scope.types) {
                    if ($scope.types[i] === type) {
                        $scope.types.splice(i, 1);
                    }
                }
            } else {
                $scope.type.$remove();
                $location.path('admin/types');
            }
        };

        $scope.update = function() {       
            var type = $scope.type;
  
            if (!type.updated) {
                type.updated = [];
            }
            type.updated = new Date().getTime();

            type.$update({typeId: $stateParams.typeId}, function() {
              $scope.findOne();
                //$location.path('types/' + type._id);
            });
        };

				
				$scope.find = function() {
            ProductTypes.query(function(types) {
                $scope.types = types;
            });
        };

        $scope.findOne = function() {
            ProductTypes.get({
                typeId: $stateParams.typeId,
            }, function(type) {
                $scope.type = type;
            });
           
        };
    }
]);
