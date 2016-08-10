myApp.controller('myCollectionController', ['$scope', '$http', '$routeParams', '$location','$window', function($scope, $http, $routeParams, $location, $window) {

	$scope.videoData = {};

	var refresh = function(){
		$http.get('/mycollection/' + $routeParams.collectionId + '/videos' )
			.then(function(result){
				$scope.videos = result.data;
				$scope.videoData.filename = "";
			})
		};
	refresh();
	$scope.upload = function(){
		var data = $scope.videoData;
		var fd = new FormData();
		for(var key in data){
			fd.append(key, data[key]);
		}
		$http.post('/mycollection/' + $routeParams.collectionId + '/video', fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type':  undefined }})
			.then(function(){
				refresh();
			})
	};
	$scope.remove = function(video){
		$http.delete('/mycollection/'+ $routeParams.collectionId + '/video/' + video._id)
			.then(function(result){
				console.log(result.data);
				refresh();
			})
	};
	$scope.edit = function(video){ 
		console.log(video);
		$scope.videoData = video;
	};
	$scope.update = function(){
		var data = $scope.videoData.filename;
		console.log($scope.videoData._id);
		var videoId = $scope.videoData._id
		$http({
				method: 'PUT',
				url: '/mycollection/' + $routeParams.collectionId + '/video/' + videoId,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: $scope.videoData
			}).then(function(){
				refresh();
			});
	};
	$scope.download = function(video){
		var videoId = video._id;
		var a = document.createElement("a");
		document.body.appendChild(a);
    	a.style = "display: none";
		
		$http({
				method: 'GET',
				url: '/mycollection/' + $routeParams.collectionId + '/video/' + videoId,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data:$scope.video,
				responseType: 'blob'
			}).then(function(result){
				var data = result.data,
		        blob = new Blob([data], { type: undefined });
		        url = ($window.URL || $window.webkitURL).createObjectURL(blob);
		   		a.href = url;
        		a.download = video.filename;
        		a.click();
	    		window.URL.revokeObjectURL($scope.fileUrl);
			});
			
	};


}]);