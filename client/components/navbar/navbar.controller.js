'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }];

  LoggedInMenu = [{
    'title': 'Classes',
    'link': '/myClasses'
  }, {
    'title': 'Students',
    'link': '/myStudents'
  },{
    'title': 'WordPacks',
    'link': '/myWordPacks'  
  },{
    'title': 'Words',
    'link': '/myWords'
  },]

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('wordRiverApp')
  .controller('NavbarController', NavbarController);
