import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;

  year = '';
  raceList = [];

  /*@ngInject*/
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }

  $onInit() {
    this.$log.info('MainController');
    this.$http.get('/api/seasons/schedule/2012').then(response => {
      this.year = response.data.year
      this.raceList = response.data.Races;
    });
  }
}

export default angular.module('gpquery.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
