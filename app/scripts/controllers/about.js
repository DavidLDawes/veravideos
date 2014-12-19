'use strict';

/**
 * @ngdoc function
 * @name veraApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the veraApp
 */
angular.module('veraApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
