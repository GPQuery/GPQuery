import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { raceComponent } from './race.component';

export const raceSingle = angular
  .module('gpquery.race.race', [
    uiRouter
  ])
  .component('race', raceComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider.state('race', {
      url: '/race/:year/:round',
      template: '<race race-data="$resolve.raceData"></race>',
      resolve: {
        pageTitle: () => 'Race',
        bodyClass: () => 'page-race',
        raceData(RaceService, $stateParams) {
          'ngInject';
          return RaceService.getResults($stateParams.year, $stateParams.round)
        }
      }
    });
  })
  .name;
