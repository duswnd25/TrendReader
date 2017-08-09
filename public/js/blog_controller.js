// Masonry
let elem = document.querySelector('.grid');
let msnry = new Masonry(elem, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
});

// AngularJS
let app = angular.module("trendReaderApp", []);


function view_create($http, item, callback) {
    $http.get("./api/blog/" + item).then(function (result) {

        let view =
            '<div class="col-md-3 tr-container">\n' +
            '    <a href="\' + result.data.  + \'" class="card">\n' +
            '        <div class="tr-blog-info-container">\n' +
            '            <img class="tr-favicon" src="\' + result.data.blog_favicon_src + \'"\n' +
            '                 alt="블로그 favicon">\n' +
            '            <h3 class="tr-blog-name">\' + result.data.blog_name + \'</h3>\n' +
            '        </div>\n' +
            '        <div class="text-center">\n' +
            '            <img class="card-img-top tr-article-image img-responsive" alt="게시글 이미지" +\n' +
            '                 src="\' + result.data.blog_header_src + \'" data-holder-rendered="true">\n' +
            '            <div class="card-block">\n' +
            '                <h4 class="card-title blog-article-title text-center">\' + result.data.article_title + \'</h4>\n' +
            '                <p class="card-text blog-article-summary">\' + result.data.article_summary +\'\n' +
            '                </p>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </a>\n' +
            '</div>;';

        callback(view);
    });
}
function getData($http, item, callback) {
    $http.get("./api/blog/" + item).then(function (result) {
        callback(result);
    });
}

app.controller("blog_controller", function ($scope, $http) {
    $scope.list = [
        getData($http, 'lezhin', function (result) {

        })
    ];
    $http.get("./api/blog/" + $scope.list.name)
        .then(function (result) {
            $scope.list.data = result;
        });
});