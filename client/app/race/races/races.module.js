import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { racesComponent } from './races.component';

export const races = angular
  .module('gpquery.race.races', [
    uiRouter
  ])
  .component('races', racesComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider.state('races', {
      url: '/races',
      template: '<races races="$resolve.races"></races>',
      resolve: {
        pageTitle: () => 'Races',
        bodyClass: () => 'page-races',
        races: RaceService => RaceService.getRaces()
      }
    });
  })
  .name;
