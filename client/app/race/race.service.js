export class RaceService {
  constructor($http, $log) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
  }
  getRaces(year) {
    return this.$http.get('/api/' + year + '/races').then(response => response.data);
  }
  getRace() {
    return this.$http.get('/api/2012/1').then(response => response.data);
  }
  getResults(year, round) {
    return this.$http.get('/api/' + year + '/' + round + '/results').then(response => response.data);
  }
}
