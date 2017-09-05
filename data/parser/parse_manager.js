const fs = require('fs');
const dbManager = require('../db/database_manager');
const path = process.cwd() + '/data/parser/blog';

exports.start = function (blogId) {
    if (blogId === 'all') {
        let blogList = fs.readdirSync(path);
        blogList.forEach(file => {
                parseData(file.replace('.js', '').toLowerCase())
            }
        );
    } else {
        parseData(blogId);
    }
};

exports.forceUpdate = function (blogId) {
    console.log('파서 : 강제 업데이트 = ' + blogId);
    let parser = require('./blog/' + blogId);
    parser.getData(function (data) {
        dbManager.updateData(blogId, data);
    });
};

function parseData(blogId) {
    console.log('파서 : 시작 = ' + blogId);
    let parser = require('./blog/' + blogId);
    parser.getData(function (data) {
        if (data !== null || data !== "") {
            dbManager.isNewData(blogId, data.link, function (isNewData) {
                if (isNewData === true) {
                    dbManager.updateData(blogId, data);
                }
            });
        }
    });
}