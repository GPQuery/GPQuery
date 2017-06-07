'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('drivers', {
    url: '/drivers',
    template: '<drivers></drivers>',
    resolve: {
      pageTitle: () => 'Drivers',
      bodyClass: () => 'drivers'
    }
  });
}
