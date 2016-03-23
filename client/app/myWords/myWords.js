'use strict';

angular.module('wordRiverApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myWords', {
        templateUrl: 'app/myWords/myWords.html',
        controller: 'MyWordsCtrl'
      });
  });
