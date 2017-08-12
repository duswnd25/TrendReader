const fs = require("fs");
let defaultOptions = {encoding: 'utf-8'};
let path = './log/';

// 새 데이터인지 확인하는 함수
exports.isNewData = function (tagName, parseTitle, rootCallback) {
    let jsonFile = require(path + tagName + '.json');
    rootCallback(!(jsonFile.article_title === parseTitle));
};

// 새 데이터로 덮어쓰는 함수
exports.saveNewData = function (tagName, data) {
    fs.writeFile(path + tagName + '.json', JSON.stringify(data), defaultOptions, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('write success');
    });
};

// 최근 값 가져오기
exports.getRecentData = function (blogName, rootCallback) {

    if (blogName === 'all') {

        let blogList = fs.readdirSync(process.cwd() + '/data/db/log');
        let result = '[';
        let counter = 1;

        blogList.forEach(file => {
            let tempFile = require(path + file);
            if (counter === 1) {
                result += JSON.stringify(tempFile);
            } else if (counter === blogList.length) {
                result += "]";
                rootCallback(JSON.parse(result));
            } else {
                result += (',' + JSON.stringify(tempFile));
            }
            counter++;
        });
    } else {
        let jsonFile = require(path + blogName + '.json');
        rootCallback(jsonFile);
    }
};