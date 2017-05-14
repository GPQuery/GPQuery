import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;

  awesomeFlags = [];
  newFlag = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/flags')
      .then(response => {
        this.awesomeFlags = response.data;
      });
  }

  addFlag() {
    if(this.newFlag) {
      this.$http.post('/api/flags', {
        name: this.newFlag
      });
      this.newFlag = '';
    }
  }

  deleteFlag(flag) {
    this.$http.delete(`/api/flags/${flag._id}`);
  }
}

export default angular.module('gpquery.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
