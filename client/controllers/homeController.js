myApp.controller('homeController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$http.get('/public/collections')
		.then(function(result) {
			$scope.collections = result.data;
		});
	$scope.open = function(collection){
		$location.path('collections/' + collection._id);
	};
}]);