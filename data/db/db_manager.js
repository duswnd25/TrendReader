const fs = require("fs");
const defaultOptions = {encoding: 'utf-8'};
const path = process.cwd() + '/data/db/log/';

// 새 데이터인지 확인하는 함수
exports.isNewData = function (tagName, parseTitle, rootCallback) {
    let jsonFile = require(path + tagName + '.json');
    rootCallback(!(jsonFile.article_title === parseTitle));
};

// 새 데이터로 덮어쓰는 함수
exports.saveNewData = function (tagName, data) {
    let tempJson = data;
    tempJson.article_date = Date.now();
    fs.writeFile(path + tagName + '.json', JSON.stringify(tempJson), defaultOptions, function (err) {
        if (err) {
            console.log(err);
        }
    });
};

// 최근 값 가져오기
exports.getRecentData = function (type, rootCallback) {

    if (type === 'all') {
        let blogList = fs.readdirSync(process.cwd() + '/data/db/log/');
        let result = '[';
        let counter = 1;

        blogList.forEach(file => {
            let tempFile = require(path + file);

            if (counter !== 1) {
                result += ',';
            }

            result += JSON.stringify(tempFile);

            if (counter === blogList.length) {
                result += ']';
                rootCallback(JSON.parse(result));
            }

            counter++;
        });
    } else {
        let jsonFile = require(path + type + '.json');
        rootCallback(jsonFile);
    }
};
