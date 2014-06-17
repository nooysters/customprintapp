/**
 *  
 */
/* jshint ignore:start */
angular.module('mean').directive('imgCrop', function() {
  return {
	    restrict: 'A',
	    scope: true,
	    templateUrl: 'customproduct/views/product/imgcrop.html',
	    //transclude: true,
	    link: function(scope, ele, attrs) {
			
	      var startX = 0, startY = 0, x = 0, y = 0; // variables to track the dragging of img.
				var maxWallSize = 600, startWidth = 600, startHeight = 480;
				scope.image={};
			 
		    scope.reset = function() {
					
		    };
				
				scope.setWallStyle = function(x, y) {
					scope.wallStyle = {width: x + 'px', height: y + 'px', overflow: 'hidden'};
				};
				
 	      scope.setImageSize = function (x, y) {
					scope.image.x = x;
					scope.image.y = y;
 	      	scope.imageStyle = {width: x + 'px', height: y + 'px'};
 	      }
				
		 
       
      
       
       var times = 1000;
       function init() {
          if(times <= 0) {
            scope.message = "Image load error!";
            return;
          }
         	if(!scope.product && times > 1) {
         	  times --;
         	  setTimeout(init, 10);
         	}
				  else {
				  
  				  scope.$apply(function() {
    				  setInitalWallSize();
  				  });
  				  
  				  return;
				  }
       }
       init();
			
      	
				var inputs = ele.find('.wall-input');
				
				inputs.on('blur', function() {
				  scope.$apply(function(){
  				  scope.wallStyleValues.width = convertFeetInches(scope.wallStyleValues.width);
  					scope.wallStyleValues.height = convertFeetInches(scope.wallStyleValues.height);
  		      var x = scope.wallStyleValues.width, y = scope.wallStyleValues.height;
  		
  					if(x && y) resizeWall(x, y); 
  					if(scope.product) getImageScale();  

				  });

									
				});

				function setInitalWallSize() {
					getImageScale();
					while(scope.image.x * scope.image.y < 10) {
							scope.wallStyleValues.scale ++;
							getImageScale();
							
							if(scope.wallStyleValues.scale > 500) {
								scope.message = 'this image is too small!';
								break;
							}
						
					}
				  scope.wallStyleValues.width = (scope.image.x > 2) ? scope.image.x : 2;
					scope.wallStyleValues.height = (scope.image.y > 2) ? scope.image.y : 2;
          resizeWall(scope.wallStyleValues.width, scope.wallStyleValues.height);
				}
				
				/**
				 * Sizes image to scale based on 72 dpi and the wall size.
				 */
				function scaleImage(d1,d2) {
					if(d1 && d2) {
					 return maxWallSize / d1 / 864 * d2 * (scope.wallStyleValues.scale /100);
					}
				}
			 
				function getImageScale() {
					var wx = parseFloat(scope.wallStyleValues.width);
					var wy = parseFloat(scope.wallStyleValues.height);
					
					var r1;
					if(wx > wy) {
					 r1 = wx;       
					}
					else {
					 r1 = wy;
					}
					var width = scaleImage(r1, scope.product.files[0].original_meta.width);
					var height = scaleImage(r1, scope.product.files[0].original_meta.height);
					
					scope.setImageSize(width, height);
				}
				
	      function resizeWall(x, y) {
	      
	        var w =  convertDecimalFeet(x);
	        var h =  convertDecimalFeet(y);
	        var $height, $width;
				
	        if(w>h) {
	          $height = maxWallSize * (h/w);
	          $width = maxWallSize;
	        }
	        else {
	          $height = maxWallSize;
	          $width = maxWallSize * (w/h);
	        }
     		 	scope.setWallStyle($width, $height);
     		 	getImageScale();
	      }
				
	      function convertFeetInches(dim) {
					if(isNaN(dim)) dim = convertDecimalFeet(dim);
				
	        var feet = parseInt(dim/1);
					
	        var inches = parseInt((dim%1) * 12);
				
	        return feet + '\' ' + inches + '\"';
	      }
      
	      function convertDecimalFeet(string) {
	        var re = /^(\d+)\s*[']?\s*(\d+)?\s*["]?/g; 
	 
					
	        var m;
					
	        while ((m = re.exec(string)) !== null) {
					
	          if (m.index === re.lastIndex) {
							
	            re.lastIndex++;
	          }

	          var a =  parseInt(m[1]);
	          var b = parseFloat(m[2]/12);
	          var dims = a ? a : 0;
	          dims += b ? b : 0;
	          if(dims) return   dims;
						return 'error';
	        }
	      }
     
		  var img =  ele.find('#main-wall-image');
		  
	    img.css({
	     position: 'relative',
	     cursor: 'pointer'
	    });
    
	    img.on('mousedown', function(event) {
	      // Prevent default dragging of selected content
	      event.preventDefault();
	      startX = event.pageX - x;
	      startY = event.pageY - y;
	      $(document).on('mousemove', mousemove);
	      $(document).on('mouseup', mouseup);
	    });
    
	    function mousemove(event) {
	      y = event.pageY - startY;
	      x = event.pageX - startX;
	      img.css({
	        top: y + 'px',
	        left:  x + 'px'
	      });
	    }
    
	    function mouseup() {
	      $(document).off('mousemove', mousemove);
	      $(document).off('mouseup', mouseup);
	    }

		}
    
  };
});