'use strict';

angular.module('wordRiverApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myClasses', {
        templateUrl: 'app/myClasses/myClasses.html',
        controller: 'MyClassesController',
        controllerAs: 'classes',
        authenticate: true
      });
  });
