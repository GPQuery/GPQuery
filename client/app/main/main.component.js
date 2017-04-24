import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;

  awesomeCountries = [];
  newCountry = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/countries')
      .then(response => {
        this.awesomeCountries = response.data;
      });
  }

  addCountry() {
    if(this.newCountry) {
      this.$http.post('/api/countries', {
        name: this.newCountry
      });
      this.newCountry = '';
    }
  }

  deleteCountry(country) {
    this.$http.delete(`/api/countries/${country._id}`);
  }
}

export default angular.module('gpqueryApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
