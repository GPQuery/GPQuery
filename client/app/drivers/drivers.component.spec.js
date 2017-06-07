'use strict';

import drivers from './drivers.component';
import {
  DriversController
} from './drivers.component';

describe('Component: DriversComponent', function() {
  beforeEach(angular.mock.module(drivers));
  beforeEach(angular.mock.module('stateMock'));

  var scope;
  var driversComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/drivers')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    driversComponent = $componentController('drivers', {
      $http,
      $scope: scope
    });
  }));

  it('should attach a list of drivers to the controller', function() {
    driversComponent.$onInit();
    $httpBackend.flush();
    expect(driversComponent.awesomeDrivers.length)
      .to.equal(4);
  });
});
