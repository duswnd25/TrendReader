// Masonry
let elem = document.querySelector('.grid');
let msnry = new Masonry(elem, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
});

// AngularJS
let app = angular.module("trendReaderApp", []);

app.controller("blog_controller", function ($scope, $http) {
    $http.get("./api/blog/all")
        .then(function (result) {
            $scope.list = result.data;
        });
});