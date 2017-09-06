// 아직 파싱 부분에서 오류가 있기 때문에
// 파싱부분은 별도의 스케쥴러를 돌린다.

const fs = require('fs');
const dbManager = require('../db/database_manager');
const path = './data/parser/blog';

let blogList = fs.readdirSync(path);
blogList.forEach(file => {
        parseData(file.replace('.js', '').toLowerCase());
    }
);

function parseData(blogId) {
    console.log('파서 : 시작 = ' + blogId);
    let parser = require('./blog/' + blogId);
    parser.getData(function (data) {
        if (data !== null && data.name !== "") {
            dbManager.isNewData(blogId, data.link, function (isNewData) {
                if (isNewData === true) {
                    dbManager.updateData(blogId, data);
                }
            });
        }
    });
}