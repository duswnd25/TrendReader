const fs = require("fs");
let defaultOptions = {encoding: 'utf-8'};
let path = './log/';

// 새 데이터인지 확인하는 함수
exports.isNewData = function (blogName, parseTitle, rootCallback) {
    let tempPath = path + blogName + '.json';

    fs.exists(tempPath, function (exists) {
        if (exists) {
            fs.readFile(tempPath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                let dataOrigin = JSON.parse(data);
                rootCallback(dataOrigin.article_title === parseTitle);
            });
        } else {
            rootCallback(false);
        }
    });
};

// 새 데이터로 덮어쓰는 함수
exports.saveNewData = function (name, data) {
    let file = fs.createWriteStream('./log/' + name + '.json', defaultOptions);
    file.write(data);
    file.end();
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
                rootCallback(result);
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