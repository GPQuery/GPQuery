'use strict';

export function runBlock($timeout, $rootScope, $state, $stateParams) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  var deregCallback = $rootScope.$on('$stateChangeSuccess', function() {
    var title = getTitle($state.$current.locals.globals.pageTitle);
    var bodyClass = getBodyClass($state.$current.locals.globals.bodyClass);
    $timeout(function() {
      $rootScope.pageTitle = title;
      $rootScope.bodyClass = bodyClass;
    });
  });

  $rootScope.$on('$destroy', deregCallback);

  function getTitle(title) {
    return angular.isFunction(title) ? title() : title;
  }

  function getBodyClass(bodyClass) {
    return angular.isFunction(bodyClass) ? bodyClass() : bodyClass;
  }

}
