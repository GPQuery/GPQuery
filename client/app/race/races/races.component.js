export const racesComponent = {
  bindings: {
    races: '<'
  },
  template: require('./races.pug'),
  controller: class RacesComponent {
    $log;
    constructor($log) {
      'ngInject';
      this.$log = $log;
    }
    $onInit() {
      this.$log.info('RacesComponent:', this.races);
    }
  }
};
