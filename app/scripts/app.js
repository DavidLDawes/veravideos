'use strict';

/**
 * @ngdoc overview
 * @name veraApp
 * @description
 * # veraApp
 *
 * Main module of the application.
 */
angular
  .module('veraApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $sceDelegateProvider) {

	$sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
	  'self',
          // Allow loading from youtube assets domain.
          'https://www.youtube.com/watch/**',
          'http://www.youtube.com/watch/**',
          '//www.youtube.com/watch/**',
          'https://www.youtube.com/embed/**',
          'http://www.youtube.com/embed/**',
          '//www.youtube.com/embed/**',
          '//www.youtube.com/embed/{{ID}}',
          'https://www.youtube.com/*/**',
          'https://www.youtube.com/**'
    ]);
	  
	  
	$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
