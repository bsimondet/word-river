'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $location, Auth) {
    this.$http = $http;
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn();
    this.isAdmin = Auth.isAdmin();
    this.CurrentUser = Auth.getCurrentUser();
  }
}

angular.module('wordRiverApp')
  .controller('MainController', MainController);
})();
