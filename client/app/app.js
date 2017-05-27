'use strict';


//  AngularJS Modules
// ------------------------------

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngTouch from 'angular-touch';


//  3rd Party Vendor Modules
// ------------------------------

import angularLoadingBar from 'angular-loading-bar';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';


//  Config/Run
// ------------------------------

import { routeConfig } from './app.config';
import { runBlock } from './app.run';


//  Components
// ------------------------------

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';


//  Styles
// ------------------------------

import './app.scss';

angular.module('gpquery', [

  ngAnimate,
  ngAria,
  ngCookies,
  ngResource,
  ngSanitize,
  ngTouch,

  angularLoadingBar,
  uiRouter,
  uiBootstrap,

  navbar,
  footer,
  main,
  constants,
  util
])
  .config(routeConfig)
  .run(runBlock);


//  Bootstrap Application
// ------------------------------

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['gpquery'], {
      strictDi: true
    });
  });
