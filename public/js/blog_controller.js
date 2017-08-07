let app = angular.module("trendReaderApp", []);

app.controller("lezhin_controller", function ($scope, $http) {
    $http.get("./api/blog/lezhin").then(function (result) {
        console.log(result);
        $scope.blog_name = result.data.blog_name;
        $scope.blog_favicon_src = result.data.blog_favicon_src;
        $scope.blog_header_image_src = result.data.blog_header_src;
        $scope.article_title = result.data.article_title;
        $scope.article_link = result.data.article_link;
        $scope.article_summary = result.data.article_summary;
        $scope.blog_update = result.data.article_date;
    });
});

app.controller("drama_controller", function ($scope, $http) {
    $http.get("./api/blog/drama").then(function (result) {
        console.log(result);
        $scope.blog_name = result.data.blog_name;
        $scope.blog_favicon_src = result.data.blog_favicon_src;
        $scope.blog_header_image_src = result.data.blog_header_src;
        $scope.article_title = result.data.article_title;
        $scope.article_link = result.data.article_link;
        $scope.article_summary = result.data.article_summary;
        $scope.blog_update = result.data.article_date;
    });
});

app.controller("rainist_controller", function ($scope, $http) {
    $http.get("./api/blog/rainist").then(function (result) {
        console.log(result);
        $scope.blog_name = result.data.blog_name;
        $scope.blog_favicon_src = result.data.blog_favicon_src;
        $scope.blog_header_image_src = result.data.blog_header_src;
        $scope.article_title = result.data.article_title;
        $scope.article_link = result.data.article_link;
        $scope.article_summary = result.data.article_summary;
        $scope.blog_update = result.data.article_date;
    });
});