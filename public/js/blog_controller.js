let app = angular.module("trendReaderApp", []);
app.controller("blog_controller", function ($scope, $http) {

    $scope.blogList = ["lezhin", "rainist", "luckyyowu"];

});