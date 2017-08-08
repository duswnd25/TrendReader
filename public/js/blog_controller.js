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

        let view = '<!-- Blog Start -->\n' +
            '    <div class="grid-item">\n' +
            '        <a href="' + result.data.article_link + '">\n' +
            '            <!-- CardView Start -->\n' +
            '            <md-card class="_md">\n' +
            '                <md-card-header>\n' +
            '                    <md-card-avatar>\n' +
            '                        <!-- Logo Image-->\n' +
            '                        <img src="' + result.data.blog_favicon_src + '">\n' +
            '                    </md-card-avatar>\n' +
            '                    <md-card-header-text>\n' +
            '                        <span class="md-title">' + result.data.blog_name + '</span>\n' +
            '                        <span class="md-subhead">' + result.data.article_date + '</span>\n' +
            '                    </md-card-header-text>\n' +
            '                </md-card-header>\n' +
            '                <img src="' + result.data.blog_header_src + '" class="md-card-image" style="height: 100px">\n' +
            '                <md-card-title>\n' +
            '                    <md-card-title-text>\n' +
            '                        <span class="md-headline">' + result.data.article_title + '</span>\n' +
            '                    </md-card-title-text>\n' +
            '                </md-card-title>\n' +
            '                <md-card-content>\n' +
            '                    <p>\n' +
            '                        ' + result.data.article_summary + '\n' +
            '                    </p>\n' +
            '                </md-card-content>\n' +
            '            </md-card>\n' +
            '            <!-- CardView End -->\n' +
            '        </a>\n' +
            '    </div>\n' +
            '    <!-- Blog End -->';

        callback(view);
    });
}

app.controller("blog_controller", function ($scope, $http) {
    let list = [
        'drama', 'lezhin', 'spoqa', 'rainist', 'jandi', 'sk', 'add2paper', 'realm', 'linchpin', 'outsider'
    ];

    list.forEach(function (item) {
        view_create($http, item, function (result) {
            $('#blog_view').append(result);
        });
    });
});