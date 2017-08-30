const fs = require('fs');
const dbManager = require('../db/db_manager');
const path = process.cwd() + '/data/parser/blog';

exports.parseData = function (blogId) {
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

function parseData(blogId) {
    console.log('파서 : 시작 ' + blogId);
    let parser = require('./blog/' + blogId);
    parser.getData(function (data) {
        dbManager.isNewData(blogId, data.title, function (isNewData) {
            if (isNewData) {
                dbManager.updateData(blogId, data);
            }
        })
    });
}