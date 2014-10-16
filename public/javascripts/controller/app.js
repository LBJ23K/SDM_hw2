'use strict';
// Declare app level module which depends on filters, and services

angular.module('myApp', ['ui.router', 'index_ejs_module', 'ngAnimate'])
	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',

		function($locationProvider, $stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('index', {
					url: "/",
					templateUrl: "partial/index",
					controller: "indexCtrl"
				})
				.state('otherwise', {
					url: "/"
				});
			$urlRouterProvider.otherwise('/');

			$locationProvider.html5Mode(true);

		}
	])