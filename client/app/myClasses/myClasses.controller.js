'use strict';

(function() {

class MyClassesController {

  constructor($http, $scope, socket, $location, Auth) {
    this.$http = $http;
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn();
    this.isAdmin = Auth.isAdmin();
    this.currentUser = Auth.getCurrentUser();

    this.classList = [];
    this.studentList = [];
    this.wordList = [];
    this.teacherCreatedWords = [];
    this.teacherWords = [];
    this.defaultWords = [];

    this.showGroup = false;

    $http.get("/api/users/me").then(response => {
      this.classList = response.data.classList;
      this.teacherCreatedWords = response.data.words;
      socket.syncUpdates('user', this.classList);
    });

    $http.get("/api/students/" + this.currentUser._id + "/students").then(response => {
      this.studentList = response.data;
      socket.syncUpdates('students', this.studentList);
    });

    $http.get("/api/words/" + this.currentUser._id + "/words").then(response => {
      this.wordList = response.data;
      socket.syncUpdates('word', this.wordList);
    });

    // showGroupInfo (group) {
    //   console.log("test");
    //   this.showGroup = true;
    // };

  };

  inArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == item) {
        return true;
      }
    }
    return false;
  };

}

angular.module('wordRiverApp')
  .controller('MyClassesController', MyClassesController);
})();
