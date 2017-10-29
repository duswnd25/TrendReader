// AngularJS
let app = angular.module("trendReaderApp", []);

app.controller("blog_controller", function ($scope, $http) {
    $http.get("./api/data/read/blog/all")
        .then(function (result) {
            $scope.list = result.data;
        });
});