/**
 */  
 
'use strict';

angular.module('mean').directive('subtotal', ['$compile', '$http', '$templateCache', 
  function($compile, $http, $templateCache) {
  
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/customproduct/views/templates/subtotal.html',
    link: function(scope, element, attrs) {
    
            
      var calcPrice = function(option, price, sqft) {
        if(option.price_per_qty === true ) return price * sqft;
        if(price <= 0) return '-';
        return price;
      };
    scope.subtotal = 0;
    scope.$watch('product.type_values', function() {
        
        var options = scope.product.type_values.type_options,
        sqft = 16;//scope.product.transformations;
        scope.displayOptions = [];

      
        for(var i=0; i<options.length; i++) {        
          if(Object.prototype.toString.call( options[i].selected ) === '[object Array]') {
            for(var j=0; j<options[i].selected.length; j++) {
              if(options[i].selected[j].value === true) {
               scope.displayOptions.push({
                   value: options[i].selected[j].value,
                   title: options[i].selected[j].title,
                   price: calcPrice(options[i], options[i].selected[j].price, sqft),
                 });
               }
            }
            
          }
          else {
            scope.displayOptions.push({
              value: options[i].selected.value,
              title: options[i].selected.title,
              price: calcPrice(options[i], options[i].selected.price, sqft),
            });
          }
          
        }
        
        for(var c=0; c<scope.displayOptions.length; c++) {
          if(parseInt(scope.displayOptions[c].price, 10) > 0)
            scope.subtotal += scope.displayOptions[c].price;
        }
      }, true);
      
      
      
    } // end link   
  };
}]);