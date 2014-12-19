'use strict';

/**
 * @ngdoc function
 * @name veraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the veraApp
 */
angular.module('veraApp')
  .controller('MainCtrl', function ($scope, Youtube, $sce) {


    // simple static data first
    // thumbnail sizes
    $scope.sizeChoices = [
      { 'name':'default', 'width':'120', 'height':'90'},
      { 'name':'high', 'width':'480', 'height':'360'},
      { 'name':'medium', 'width':'320', 'height':'180'}
    ];

    $scope.perValues = [ 
      { 'name': '5 per page', 'value': 5 },
      { 'name': '10 per page', 'value': 10 },
      { 'name': '25 per page', 'value': 25 }
    ];

    // simple boolean variables 
    $scope.showThumbs = true;
    $scope.showEMbedded = true;

    // more complicated non-static data: 
    // the image size currently selected.
    // We default to the first item (item [0]) in other words we
    // default to default which is the smallest
    $scope.imageSize = $scope.sizeChoices[0];

    // entries per page defaults to smallest
    $scope.perPage = $scope.perValues[0];

    // simple functions used by htm methods in ng-click and so on
    $scope.updateNext = function() {
      Youtube.updateNext();
    };

    $scope.updateLast = function() {
      Youtube.updateLast();
    };

    $scope.showDefault = function() {
      return ($scope.imageSize === $scope.sizeChoices[0]);
    };

    $scope.showMedium = function() {
      return ($scope.imageSize === $scope.sizeChoices[2]);
    };

    $scope.showHigh = function() {
      return ($scope.imageSize === $scope.sizeChoices[1]);
    };

    $scope.page = function() {
      return Youtube.getPage();
    };

    $scope.pagesLeft = function() {
      return  Math.floor( ($scope.total + $scope.maxCount - 1)/$scope.maxCount)  - Youtube.getPage() - 1;
    };

    $scope.fixPages = function() {
      Youtube.setPageSize($scope.perPage.value);
    };

    // experimental function, haven't used this correctly yet
    // trying to figure out how to embed videos 
    // rather than link to youtube for them
    $scope.setEmbedded = function(ids) {

      $scope.trustedEmbedded = $sce.trustAsHtml(
        '<iframe src="//www.youtube.com/embed/' + ids + 
        '" width="640" height="360" frameborder="4" allowfullscreen>' +
        '</iframe>');
    };

    $scope.getTrustedEmbedded = function(ytid) {
      $scope.trustedEmbeddedDefault = $sce.trustAsHtml('<iframe src="//www.youtube.com/embed/' + ytid + 
        '" width="120" height="90" frameborder="1" allowfullscreen>' + 
        '</iframe>');
      $scope.trustedEmbeddedHigh =$sce.trustAsHtml('<iframe src="//www.youtube.com/embed/' + ytid + 
        '" width="480" height="360" frameborder="1" allowfullscreen>' +
        '</iframe>');
      $scope.trustedEmbeddedMedium =$sce.trustAsHtml('<iframe src="//www.youtube.com/embed/' + ytid + 
        '" width="320" height="180" frameborder="1" allowfullscreen>' +
        '</iframe>');
    };

    // complex function: at init time we are telling the Youtube service that 
    // on success the service can inject results using this anonymous method
    Youtube.injectOnSuccess(

      // Youtube service .success() will call this function to pass needed
      // results back into the data model for display
      function(injectMe, injectPer, injectSoFar, injectTotal) {
        $scope.videos = injectMe;
        $scope.maxCount = injectPer;

        $scope.setEmbedded($scope.videos[0].id.videoId);

        // check to see if we are injecting the last results 
        $scope.next = Youtube.nextPage();
        if (($scope.next === undefined) || ($scope.next === null) || ($scope.next.length === 0) || ($scope.next === 'trigger')) {
          // are we actually still at the end?
          if (Youtube.getPage() < Math.floor((injectTotal + $scope.maxCount - 1)/$scope.maxCount)) {
            $scope.next = 'trigger';
          } else {
            $scope.next = null; // yes we really are at the last page
          }
        }
        $scope.soFarFrom = injectSoFar + 1;
        $scope.soFarTo = injectSoFar + injectPer;
        if ($scope.soFarTo > injectTotal + 1) {
          $scope.soFarTo = injectTotal + 1;
        }
        $scope.per = injectPer;
        $scope.total = injectTotal + 1;
      }
    );
  });
