let fs = require('fs');
let dbManager = require('../db/db_manager');
let path = './blog';

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