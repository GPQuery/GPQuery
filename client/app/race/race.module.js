import angular from 'angular';
import { RaceService } from './race.service';
//import { lengthCheck } from './length-check/length-check.directive';
import { races } from './races/races.module';
import { raceSingle } from './race/race.module';
//import { raceSingle } from './race/race.module';
//import { contactNew } from './contact-new/contact-new.module';
//import { contactDetail } from './contact-detail/contact-detail.module';
//import { contactEdit } from './contact-edit/contact-edit.module';
//import { contactTag } from './contact-tag/contact-tag.module';

export const race = angular
  .module('gpquery.race', [
    races,
    raceSingle
  ])
  .service('RaceService', RaceService)
  //.directive('lengthCheck', lengthCheck)
  .name;
