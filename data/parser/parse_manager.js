const fs = require('fs');
const dbManager = require(process.cwd() + '/data/db/db_manager');
const path = process.cwd() + '/data/parser/blog';

exports.parseData = function (type) {
    if (type === 'all') {
        let blogList = fs.readdirSync(path);
        blogList.forEach(file => {
                let parser = require('./blog/' + file);
                let tagName = file.replace('.js', '').toLowerCase();
                parser.getData(function (data) {
                    dbManager.isNewData(tagName, data.article_title, function (isNewData) {
                        if (isNewData) {
                            dbManager.saveNewData(tagName, data);
                        }
                    })
                });
            }
        );
    } else {
        let parser = require('./blog/' + type);
        parser.getData(function (data) {
            dbManager.isNewData(type, data.article_title, function (isNewData) {
                if (isNewData) {
                    dbManager.saveNewData(type, data);
                }
            })
        });
    }
};