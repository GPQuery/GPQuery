import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './drivers.routes';

export class DriversController {
  $http;

  driversList = [];

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/drivers')
      .then(response => {
        this.driversList = response.data;
      });
  }
}

export default angular.module('gpquery.drivers', [uiRouter])
  .config(routing)
  .component('drivers', {
    template: require('./drivers.pug'),
    controller: DriversController
  })
  .name;
