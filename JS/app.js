let App = angular.module('App', [
  "batsCtrl",
  "batsfilters",
  "ngRoute",
  "ngSanitize",
  "ngQuill"
]);



App.config([
  "$routeProvider",
  "ngQuillConfigProvider",
  function ($routeProvider, ngQuillConfigProvider) {
    ngQuillConfigProvider.set();


    $routeProvider

      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'aboutCtrl'
      })
      .when('/Categories', {
        templateUrl: 'views/Categories.html',
        controller: "categoriesCtrl",
      })
      .when('/batlist', {
        templateUrl: 'views/batlist.html',
        controller: 'batListCtrl'
      })
      .when('/addnewbat', {
        templateUrl: 'views/addnewbat.html',
        controller: 'batAddCtrl'
      })
      .when("/bat/edit/:id", {
        templateUrl: "views/editbat.html",
        controller: "batEditCtrl",
      })
      .when("/bat/detail/:id", {
        templateUrl: "views/batdetail.html",
        controller: "batDetailCtrl",
      })
      .otherwise({ templateUrl: "./views/404.html" });
  }]);






App.run(function ($rootScope, $http, $location) {
  $http.get("bat.json").then(function (res) {
    $rootScope.bats = res.data;
  });
  $http.get("categorie.json").then(function (res) {
    $rootScope.categories = res.data;
  });
  $http.get("about.json").then(function (res) {
    $rootScope.abouts = res.data;
  });

  $rootScope.$on("$locationChangeSuccess", function () {
    console.log($location.path());
    $rootScope.page = $location.path();
  });
});