myApp.controller('collectionController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	var video = {};

	$http.get('/public/collections/' + $routeParams.collectionId )
		.then(function(result){
			console.log(result.data);
			$scope.videos = result.data;
		})
}]);