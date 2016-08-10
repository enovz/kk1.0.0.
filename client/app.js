var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|blob):/);

    $routeProvider
	    .when('/', {
	        templateUrl : 'views/home.html',
	        controller  : 'homeController'
	    })
	    .when('/collections/:collectionId', {
	        templateUrl : 'views/collection.html',
	        controller  : 'collectionController'
	    })
	    .when('/my-collections', {
	        templateUrl : 'views/my-collections.html', 
	        controller  : 'myCollectionsController'		
	    })
	    .when('/my-collection/:collectionId', {
	        templateUrl : 'views/my-collection.html', 
	        controller  : 'myCollectionController'		
	    })
	    .otherwise({redirectTo: '/'});
});