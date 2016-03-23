'use strict';

angular.module('wordRiverApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myWordPacks', {
        templateUrl: 'app/myWordPacks/myWordPacks.html',
        controller: 'MyWordPacksCtrl'
      });
  });
