'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }, {
    title: 'Seasons',
    state: 'seasons',
    disabled: true
  }, {
    title: 'Races',
    state: 'races'
  }, {
    title: 'Drivers',
    state: 'drivers'
  }, {
    title: 'Constructors',
    state: 'constructors',
    disabled: true
  }, {
    title: 'Circuits',
    state: 'circuits',
    disabled: true
  }];
  isCollapsed = true;
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
