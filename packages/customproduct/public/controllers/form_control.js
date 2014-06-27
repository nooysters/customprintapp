/**
 *  
 */
'use strict';

angular.module('mean').directive('formControlAuto', ['$compile', '$http', '$templateCache', 
  function($compile, $http, $templateCache) {

    var getTemplate = function(contentType) {
    
      var templateLoader,
      baseUrl = '/customproduct/views/templates/',
      templateMap = {
          select: 'select.html',
          checkbox: 'checkboxes.html',
          radio: 'radios.html',
          text: 'text.html',
          'text area': 'textarea.html',
      };
      
      var templateUrl = baseUrl + templateMap[contentType];
          templateLoader = $http.get(templateUrl, {cache: $templateCache});

          return templateLoader;
  };
  
  return {
    restrict: 'E',
    scope: {
	    option: '='
    },
    link: function(scope, element, attrs) {
    
      if(!scope.option.selected) scope.option.selected = [];
      
    	scope.updateSelected = function(option, $index) {
    	 scope.option.selected[$index] = option;      	
    	};
    	
      scope.updateSelectedA = function(option) {
    	 scope.option.selected = option;      	
    	};
    	
      var type = scope.option.display_type;
      if(type === 'checkbox/radio') {
        if(scope.option.select_multiple)
          type = 'checkbox';
        else
          type = 'radio';
      }
      var loader = getTemplate(type);
  
      loader.success(function(html) {
          element.html(html);
      }).then(function (response) {
          element.replaceWith($compile(element.html())(scope));
      });
 
    }    
  };
}]);