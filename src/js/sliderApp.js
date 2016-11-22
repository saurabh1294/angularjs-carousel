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
			
			carouselService.getData(param)
                    .success(function(response){
						console.log(response);
						$scope.items = response.content;
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
			
			
			// var overlay_main_height = $('.overlay-parent').css('height'),//'290px',
				// overlay_content_height = $('.overlay-content').css('height'),//'190px',
				// overlay_bg_height = $('.overlay-bg').css('height'); //'280px';
				
				
				 var overlay_main_height = '290px',
				 overlay_content_height = '190px',
				 overlay_bg_height = '320px';
			
			// hide
			if ($scope.showContentPane)
			{
				
				 $('.overlay-bg').css('height', '60px');
				 $('.overlay-content').css('height', '60px');
				 $('.overlay-parent').css('height', '60px');
				$('.expand-collapse-content').attr('src', 'assets/images/down-arrow.jpg');
			}
			else
			{
				$('.overlay-bg').css('height', overlay_bg_height);
				$('.overlay-content').css('height', overlay_content_height);
				$('.overlay-parent').css('height', overlay_main_height);
				$('.expand-collapse-content').attr('src', 'assets/images/up-arrow.jpg');
			}
			
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