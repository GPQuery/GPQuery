import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;

  awesomeDrivers = [];
  newDriver = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/drivers')
      .then(response => {
        this.awesomeDrivers = response.data;
      });
  }

  addDriver() {
    if(this.newDriver) {
      this.$http.post('/api/drivers', {
        name: this.newDriver
      });
      this.newDriver = '';
    }
  }

  deleteDriver(driver) {
    this.$http.delete(`/api/drivers/${driver._id}`);
  }
}

export default angular.module('gpquery.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
