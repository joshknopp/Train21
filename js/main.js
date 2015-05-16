// Angular app
angular.module('BlackjackTrainerApp', [
               'BlackjackTrainerApp.model.SUIT',
               'BlackjackTrainerApp.model.Card',
               'BlackjackTrainerApp.model.Hand',
               'BlackjackTrainerApp.model.Table',
               'BlackjackTrainerApp.model.Strategy'
	])
	.controller('BlackjackTrainerController', ['$scope', '$http', '$log', function($scope, $http, $log) {
    
	$log.debug("$.fn.jquery = " + $.fn.jquery);
	$log.debug("angular.version = " + JSON.stringify(angular.version));
    
    $scope.httpErrorHandler = function(data, status, headers, config) {
    	$log.error("httpErrorHandler"
    			+ " data=" + JSON.stringify(data)
    			+ " status=" + JSON.stringify(status)
    			+ " headers=" + JSON.stringify(headers)
    			+ " config=" + JSON.stringify(config)
    	);
    }
	
    /*
	$scope.doHttpCall = function() {
		var config = {params:{method:"httpcall"}};
		$http.get("/blackjacktrainer/cfc/main.cfc", config).
		  success($scope.httpCallResultHandler).
		  error($scope.httpErrorHandler);
	}
	
	$scope.httpCallResultHandler = function(data, status, headers, config) {
		$log.info("httpCall result data=" + data);
		$scope.httpCallResult = $.parseJSON(data);
		// Do something with data
	}
	*/
	
	$scope.dealTable = function() {
		var strategyObj = new Strategy();
		$scope.currentTable = strategyObj.table;
		$scope.currentStrategy = strategyObj.strategy;
		$scope.isVisibleStrategy = strategyObj.isVisibleStrategy;
	}
	
	$scope.showAllDealerCards = function() {
		angular.forEach($scope.currentTable.dealerHand.cards, function(value, key) {
			value.isFaceDown = false;
		});
	}
	
	$scope.showStrategy = function() {
		$scope.isVisibleStrategy = true;
	}
	
	$scope.play = function(value) {
		$scope.isCorrectStrategy = (value == $scope.currentStrategy.substring(0, 1));
		$scope.isVisibleStrategy = true;
	}
	
	// TODO Consider using a transformResponse function instead
	$scope.queryToArray = function(value) {
		if(!value.hasOwnProperty("COLUMNS") || !value.hasOwnProperty("DATA") || value.COLUMNS.length === 0 || value.DATA.length === 0) {
			return [];
		}
		// 
		var result = [];
		for(var i = 0; i < value.DATA.length; i++) {
			var item = {};
			for(var j = 0; j < value.COLUMNS.length; j++) {
				item[value.COLUMNS[j]] = value.DATA[i][j];
			}
			result.push(item);
		}
		return result;
	}
	
	// On init, deal some cards!
	$scope.dealTable();
    
  }]).directive('ngEnter', function () {
		// http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
		return function (scope, element, attrs) {
	          element.bind("keydown keypress", function (event) {
	              if(event.which === 13) {
	                  scope.$apply(function (){
	                      scope.$eval(attrs.ngEnter);
	                  });
	                  event.preventDefault();
	              }
	          });
	    };
	  });



function noop() {
	return false;
}



// https://gist.github.com/maciej-gurban/9998047
(function($){
	  /*
	   * A lightweight window resize listener
	   */
	  var waitForFinalEvent = function(){var b={};return function(c,d,a){a||(a="I'm a banana!");b[a]&&clearTimeout(b[a]);b[a]=setTimeout(c,d)}}();
	  /*
	   * @returns
	   * true  - if page is currently using the breakpoint specified as argument
	   * false - if otherwise
	   */
	  function isBreakpoint( alias ) {
	    return $('.visible-' + alias + '-inline').is(':visible');
	  }
	  
	  // Only collapse/expand if breakpoint is crossing threshold between SM and MD
	  var wasSmall = null;
	  function handleResize() {
		  var isSmall = (isBreakpoint('xs') || isBreakpoint('sm'));
		  if(isSmall !== wasSmall) {
			  wasSmall = isSmall;
			  if(isSmall) {
				  // Stuff
			  } else {
				  // Other stuff
			  }
		  }
	  }
	  
	  /*
	   * Main window resize listener
	   * Executes each time window has been resized
	   */
	  $(window).resize(function () {
	    waitForFinalEvent(handleResize, 300, new Date().getTime())
	  });
	  
	  $(document).ready(handleResize);
	  
	 
})(jQuery);
