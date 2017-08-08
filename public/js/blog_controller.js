let app = angular.module("trendReaderApp", []);

function initData($scope, $http, type) {
    $http.get("./api/blog/" + type).then(function (result) {
        console.log(result);
        $scope.blog_name = result.data.blog_name;
        $scope.blog_favicon_src = result.data.blog_favicon_src;
        $scope.blog_header_image_src = result.data.blog_header_src;
        $scope.article_title = result.data.article_title;
        $scope.article_link = result.data.article_link;
        $scope.article_summary = result.data.article_summary;
        $scope.blog_update = result.data.article_date;
    });
}

app.controller("blog_controller", function ($scope, $http) {
    $scope.list = [{name: 'lezhin'}, {name: 'drama'}, {name: 'rainist'}, {name: 'spoqa'}];
    initData($scope, $http, $scope.list.name);
});