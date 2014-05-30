'use strict';

angular.module('mean').controller('ProductOptionsController', ['$scope', '$stateParams', '$location', 'Global', 'ProductOptions',
    function($scope, $stateParams, $location, Global, ProductOptions) {
    
       
        $scope.edit = function(option) {
          $scope.newOption = false;
          $scope.option = option;
        };
        
        $scope.addOptionValue = function() {
          var len = $scope.option.values.length - 1; 
          if($scope.option.values[len].title || $scope.option.values[len].price) {
            $scope.option.values.push({title: null, price:null});
          }     
        };
        
        $scope.removeOptionValue = function(index) {
          if($scope.option.values.length > 1) {
            $scope.option.values.splice(index, 1);
          }
        };
        
        $scope.create = function() {
          $scope.newOption = false;
          var option = new ProductOptions.$resource($scope.option);
          option.$save(function(response) {
             // $location.path('/admin/options/' + response._id + '/edit');
          });

          this.title = '';
          this.content = '';
        };
        
        $scope.addTypeOption = function(option) {
          ProductOptions.passOption(option);
        };
        
        $scope.remove = function(option) {
          if (option) {
              option.$remove();

              for (var i in $scope.options) {
                  if ($scope.options[i] === option) {
                      $scope.options.splice(i, 1);
                  }
              }
          } else {
              $scope.option.$remove();
             // $location.path('admin/options');
          }
        };

        $scope.update = function() {       
          var option = $scope.option;
          if (!option.updated) {
              option.updated = [];
          }
          option.updated = new Date().getTime();

          option.$update(option, function() {
              //$location.path('options/' + option._id);
          });
        };
				
				$scope.find = function() {
          ProductOptions.$resource.query(function(options) {
              $scope.options = options;
          });
        };

        $scope.findOne = function() {
          ProductOptions.$resource.get({
              optionId: $stateParams.optionId,
          }, function(option) {
              $scope.option = option;
          });    
        };
        
        
       $scope.init = function() {
         $scope.newOption = true;
         $scope.options = $scope.find();
         $scope.option = {
           title: '',
           description: '',
           values: [{title: null , price: null}]
         };
        };
        $scope.init();
        
    }
]);
