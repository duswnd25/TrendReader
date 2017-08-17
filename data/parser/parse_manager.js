const fs = require('fs');
const dbManager = require(process.cwd() + '/data/db/db_manager');
const path = process.cwd() + '/data/parser/blog';

exports.parseData = function (type) {
    if (type === 'all') {
        let blogList = fs.readdirSync(path);
        blogList.forEach(file => {
                parseData(file.replace('.js', '').toLowerCase())
            }
        );
    } else {
        parseData(type);
    }
};

function parseData(type) {
    let parser = require('./blog/' + type);
    parser.getData(function (data) {
        dbManager.isNewData(type, data.title, function (isNewData) {
            if (isNewData) {
                dbManager.saveNewData(type, data);
            }
        })
    });
}