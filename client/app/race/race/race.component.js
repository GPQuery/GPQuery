export const raceComponent = {
  bindings: {
    raceData: '<'
  },
  template: require('./race.pug'),
  controller: class RaceComponent {
    $log;

    constructor($log) {
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      this.$log.info('RaceComponent', this.raceData);
    }

    //selectRace() {
    //  this.onSelect({
    //    $event: {
    //      raceId: this.race.raceRef,
    //    },
    //  });
    //}
  },
};
