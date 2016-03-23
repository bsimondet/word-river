'use strict';

angular.module('wordRiverApp.auth', [
  'wordRiverApp.constants',
  'wordRiverApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
