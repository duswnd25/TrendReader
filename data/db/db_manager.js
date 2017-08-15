const Fs = require("fs");
const Realm = require('realm');
const PostSchema = require('./post_realm');

let blogRealm = new Realm({
    path: 'blog.realm',
    schema: [PostSchema.getSchema()]
});

// 새 데이터인지 확인하는 함수
exports.isNewData = function (tagName, parseTitle, rootCallback) {
    let recentTitle = blogRealm.objects('Post').filtered('name = "' + tagName + '"').filtered('title = "' + parseTitle.trim() + '"');
    rootCallback(recentTitle.length === 0);
};


// 새 데이터로 덮어쓰는 함수
exports.saveNewData = function (tagName, data) {

    blogRealm.write(() => {
        blogRealm.create('Post', {
            name: data.name,
            favicon_src: data.favicon_src,
            header_src: data.header_src,
            title: data.title,
            link: data.link,
            summary: data.summary,
            type: data.type,
            timestamp: new Date()
        }, true);
    });
};


// 최근 값 가져오기
exports.getRecentData = function (type, rootCallback) {
    if (type === 'all') {
        rootCallback(blogRealm.objects('Post').sorted('timestamp', true));
    } else {
        rootCallback(blogRealm.objects('Post').filtered('name = "' + type + '"'));
    }
};

Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = this.getHours().toString();
    let minute = this.getMinutes().toString();
    return year + '년 ' + month + '월' + date + '일 ' + hour + '시 ' + minute + '분';
};
