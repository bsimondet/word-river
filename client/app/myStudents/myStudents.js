'use strict';

angular.module('wordRiverApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myStudents', {
        templateUrl: 'app/myStudents/myStudents.html',
        controller: 'MyStudentsCtrl',
        controllerAs: 'studentctrl'
      });
  });
