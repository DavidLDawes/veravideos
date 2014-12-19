'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('veraApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should initialize the thumbnail and page sizes in the scope', function () {

    expect(scope.sizeChoices.length).toEqual(3);
    expect(scope.sizeChoices[0]).toEqual({ 'name':'default', 'width':'120', 'height':'90'});
    expect(scope.sizeChoices[1]).toEqual({ 'name':'high', 'width':'480', 'height':'360'});
    expect(scope.sizeChoices[2]).toEqual({ 'name':'medium', 'width':'320', 'height':'180'});

    expect(scope.imageSize).toEqual(scope.sizeChoices[0]);


    expect(scope.perValues.length).toEqual(3);
    expect(scope.perValues[0]).toEqual({ 'name': '5 per page', 'value': 5 });
    expect(scope.perValues[1]).toEqual({ 'name': '10 per page', 'value': 10 });
    expect(scope.perValues[2]).toEqual({ 'name': '25 per page', 'value': 25 });

    expect(scope.perPage).toEqual(scope.perValues[0]);

  });
});
