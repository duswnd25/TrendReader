const Realm = require('realm');
const PostSchema = require('./post_realm');
const schemaVersion = 4;

let blogRealm = new Realm({
    path: '/realm/blog.realm',
    schema: [PostSchema.getSchema()],
    schemaVersion: schemaVersion,
    migration: function (oldRealm, newRealm) {
        // schemaVersion을 1로 업데이트하는 경우만 이 변경을 적용합니다
        if (oldRealm.schemaVersion < schemaVersion) {
            let oldObjects = oldRealm.objects('Post');
            let newObjects = newRealm.objects('Post');

            console.log('INFO : ', 'New Realm Schema');

            // 모든 객체를 순환
            for (let index = 0; index < oldObjects.length; index++) {
                newObjects[index].id = oldObjects[index].id;
                newObjects[index].name = oldObjects[index].name;
                newObjects[index].favicon_src = oldObjects[index].favicon_src;
                newObjects[index].header_src = oldObjects[index].header_src;
                newObjects[index].title = oldObjects[index].title;
                newObjects[index].link = oldObjects[index].link;
                newObjects[index].summary = oldObjects[index].summary;
                newObjects[index].type = oldObjects[index].type;
                newObjects[index].timestamp = oldObjects[index].timestamp;
            }
        }
    }
});

// 새 데이터인지 확인하는 함수
exports.isNewData = function (tagName, parseTitle, rootCallback) {
    let recentTitle = blogRealm.objects('Post').filtered('id = "' + tagName + '"').filtered('title = "' + parseTitle.trim() + '"');
    console.log('INFO : ', '새 데이터 : ' + (recentTitle.length === 0) + ' | ' + tagName);
    rootCallback(recentTitle.length === 0);
};

// 새 데이터로 덮어쓰는 함수
exports.saveNewData = function (tagName, data) {
    console.log('INFO : ', '저장 : ' + tagName + ' | ' + data.title.trim());
    blogRealm.write(() => {
        blogRealm.create('Post', {
            id: tagName,
            name: data.name.trim(),
            favicon_src: data.favicon_src.trim(),
            header_src: data.header_src.trim(),
            title: data.title.trim(),
            link: data.link.trim(),
            summary: data.summary.trim(),
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
        rootCallback(blogRealm.objects('Post').filtered('id = "' + type + '"'));
    }
};

// 여기서부터 테스트용
exports.saveTest = function (type) {
    console.log('INFO : ', '저장 테스트 : ' + type);
    blogRealm.write(() => {
        blogRealm.create('Post', {
            id: type,
            name: "test",
            favicon_src: "",
            header_src: "test",
            title: "test",
            link: "test",
            summary: "test",
            type: "T",
            timestamp: new Date()
        }, true);
    });
};

// 날짜 포맷
Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = this.getHours().toString();
    let minute = this.getMinutes().toString();
    return year + '년 ' + month + '월' + date + '일 ' + hour + '시 ' + minute + '분';
};
