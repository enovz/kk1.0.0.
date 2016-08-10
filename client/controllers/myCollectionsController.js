myApp.controller('myCollectionsController', ['$scope', '$http', '$location','$routeParams', function($scope, $http, $location, $routeParams) {

	$scope.collectionData = {};

	var refresh = function(){
		$http.get('/mycollections')
			.then(function(result) {
				$scope.collections = result.data;
				$scope.collectionData.title = "";
			});
		};

	refresh();
	$scope.addCollection = function(){
    	$http({
				method: 'POST',
				url: '/mycollection',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: $scope.collectionData
			}).then(function(result){
				refresh();
			});
		};
	$scope.remove = function(collection){
		$http.delete('/mycollection/' + collection._id)
			.then(function(result){
				refresh();
			})
	};
	$scope.edit = function(collection){ 
		$http.get('/mycollection/' + collection._id)
			.then(function(result){
				$scope.collectionData = result.data[0];
			})
	}
	//get update to work
	$scope.update = function(){
		$http({
				method: 'PUT',
				url: '/mycollection/'+ $scope.collectionData._id,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: $scope.collectionData
			}).then(function(){
				refresh();
			});

	};
	$scope.open = function(collection){
		$location.path('my-collection/' + collection._id);
	};
}]);