'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>',
    resolve: {
      pageTitle: function() {
        return 'Home';
      },
      bodyClass: function() {
        return 'page-home';
      }
    }
  });
}
