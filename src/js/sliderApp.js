"use strict";



var sliderComponent = angular.module("sliderComponent", []);



sliderComponent.controller('sliderCtrl', ['$scope', '$sce', 'carouselService',
    function($scope, $sce, carouselService) {
		$scope.items = [];
		var init = function() {
			// init all params
			var param = {};
			$scope.showContentPane = true;
			$scope.currentIndex = 0;
			$scope.heading = '';
			
			// web service call to fetch data from json
			carouselService.getData(param)
                    .success(function(response){
						console.log(response);
						$scope.items = response.content;
						$scope.heading = response.title;
                    })
                    .error(function(error, status){
                        alert("error occured ", status);
                    });
			
		};
		// init carousel
		init();
		
		$scope.getHtml = function(html){
			// strict contextual escaping for marking the json data HTML as safe
			return $sce.trustAsHtml(html);
		};
		
		$scope.previous = function() {
			// decrement index on previous arrow click and wrap around on boundary condition
			if ($scope.currentIndex > 0) {
				$scope.currentIndex--;
			}
			else {
				$scope.currentIndex = $scope.items.length - 1;
			}
		};
		
		$scope.next = function() {
			var numItems = $scope.items.length;
			// increment index on next arrow click and wrap around on boundary condition
			$scope.currentIndex = ($scope.currentIndex + 1) % numItems;
		};
		
		$scope.toggleView = function() {
			// hide and show widget for handling expand/collapse logic
			$scope.showContentPane = !$scope.showContentPane;
		}
		
		
    }
]);

sliderComponent.filter('html', function($sce) {
    return function(val) {
		// return safe HTML by strict contextual escaping
        return $sce.trustAsHtml(val);
    };
});

// web service
sliderComponent.service('carouselService', ['$http', function($http) {
	// angularjs $http service call to fetch carousel data via json
    this.getData = function (param) {
        return $http.get('/angularjs-carousel/content.json', param);
    }
}]);