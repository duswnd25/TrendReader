let app = angular.module("trendReaderApp", []);
app.controller("blog_controller", function ($scope, $http) {

    $scope.blogList = [
        'add2paper',
        'drama',
        'jandi',
        'kakao',
        'lezhin',
        'linchpin',
        'line',
        'luckyyowu',
        'outsider',
        'rainist',
        'realm',
        'sk',
        'spoqa',
        'unity',
        'woowabros'
    ];

});