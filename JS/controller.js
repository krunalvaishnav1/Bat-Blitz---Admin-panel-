let batsCtrl = angular.module("batsCtrl", [])
  .controller("aboutCtrl", function ($scope, $rootScope) {
    $scope.about = $rootScope.abouts.about;
  })
  .controller("categoriesCtrl", function ($scope, $rootScope) {
    $scope.orderByField = "type";
    $scope.reverseOrder = false;
    $scope.customOrderBy = (field) => {
      $scope.orderByField = field;
      $scope.reverseOrder = !$scope.reverseOrder;
    };
    $scope.newCategory = {};
    $scope.addNewCategory = () => {
      $scope.newCategory.id =
        Math.max.apply(
          Math,
          $rootScope.categories.map(function (category) {
            return category.id;
          })
        ) + 1;
      $scope.newCategory.created = formatDate(new Date());
      function formatDate(date) {
        return date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
      }
      $rootScope.categories.push($scope.newCategory);
      $scope.newCategory = {};
    };
    $scope.selectedCategory = {};
    $scope.selectCategory = (id) => {
      let category = $rootScope.categories.find((category) => {
        return category.id == id;
      });
      $scope.selectedCategory.id = category.id;
      $scope.selectedCategory.type = category.type;
      $scope.selectedCategory.created = category.created;
    };
    $scope.updateCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1, $scope.selectedCategory);
      $scope.selectedCategory = {};
    };
    $scope.deleteCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1);
    };
  })
  .controller("batListCtrl", function ($scope, $rootScope) {
    $scope.selectedBat = {};
    $scope.selectBat = (id) => {
      let bat = $rootScope.bats.find((bat) => {
        return bat.id == id;
      });
      $scope.selectedBat.id = bat.id;
      $scope.selectedBat.brand = bat.brand;
    };
    $scope.deleteBat = () => {
      let index = $rootScope.bats.findIndex((bat) => {
        return bat.id == $scope.selectedBat.id;
      });
      $rootScope.bats.splice(index, 1);
      $scope.selectedBat = {};
    };
  })
  .controller("batEditCtrl", function ($scope, $rootScope, $routeParams, $http, $location) {
    $scope.batId = $routeParams.id;

    $scope.updateBat = function () {
      var index = $rootScope.bats.findIndex(function (bat) {
        return bat.id == $scope.batId;
      });
      $rootScope.bats[index] = {
        id: $scope.batId,
        brand: bats[batId - 1].brand,
        imageUrl: bats[batId - 1].imageUrl,
        type: bats[batId - 1].type,
        price: bats[batId - 1].price,
        grip: bats[batId - 1].grip,
        weight: bats[batId - 1].weight,
        blade: bats[batId - 1].blade,
        ballType: bats[batId - 1].ballType,
        description: bats[batId - 1].description
      };
      $location.path('/batlist');
    };
    $scope.updateType = function () {
      $scope.selectedType = $scope.type;
    };
    $scope.updateBlade = function () {
      $scope.selectedBlade = $scope.blade;
    };
    $scope.submitForm = function () {
      $scope.updateBat();
    };
  })
  .controller(
    "batDetailCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.batId = $routeParams.id;
    })
  .controller("batAddCtrl", function ($scope, $rootScope, $location) {
    if (!$rootScope.bats) {
      $rootScope.bats = [];
    }
    var newBatId = $rootScope.bats.length + 1;
    $scope.addBat = function () {
      var newBat = {
        id: newBatId,
        brand: $scope.brand,
        imageUrl: $scope.imageUrl,
        type: $scope.type,
        price: $scope.price,
        grip: $scope.grip,
        weight: $scope.weight,
        blade: $scope.blade,
        ballType: $scope.ballType,
        description: $scope.description
      };
      $rootScope.bats.push(newBat);
      $location.path('/batlist');
    };
    $scope.submitForm = function () {
      $scope.addBat();
    };
  })