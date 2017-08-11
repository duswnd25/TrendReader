let fs = require('fs');
let dbManager = require('../db/db_manager');
let path = './blog';

let blogList = fs.readdirSync(path);
blogList.forEach(file => {
        let parser = require('./blog/' + file);
        parser.getData(function (data) {
            dbManager.isNewData(data.blog_name, data.article_title, function (isNewData) {
                if (isNewData) {
                    dbManager.saveNewData(data);
                } else {
                }
            })
        });
    }
);
