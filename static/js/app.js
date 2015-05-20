var app = angular.module("flashlearn",['ngRoute','ngAnimate']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'views/catagories.html'
		});
});