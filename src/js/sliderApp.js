"use strict";



var sliderComponent = angular.module("sliderComponent", []);



sliderComponent.controller('sliderCtrl', ['$scope', '$sce', 'carouselService',
    function($scope, $sce, carouselService) {
		$scope.items = [];
		var init = function() {
			// fetch carousel data
			var param = {};
			$scope.showContentPane = true;
			$scope.currentIndex = 0;
			$scope.heading = '';
			
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
			return $sce.trustAsHtml(html);
		};
		
		$scope.previous = function() {
			if ($scope.currentIndex > 0) {
				$scope.currentIndex--;
			}
			else {
				$scope.currentIndex = $scope.items.length - 1;
			}
		};
		
		$scope.next = function() {
			var numItems = $scope.items.length - 1;
			$scope.currentIndex = ($scope.currentIndex + 1) % numItems;
		};
		
		$scope.toggleView = function() {
			$scope.showContentPane = !$scope.showContentPane;
		}
		
		
    }
]);

sliderComponent.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

// web service
sliderComponent.service('carouselService', ['$http', function($http) {
    this.getData = function (param) {
        return $http.get('/angularjs-carousel/content.json', param);
    }
}]);