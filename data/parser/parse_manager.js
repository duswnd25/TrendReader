exports.getData = function (type, rootCallback) {
    if (type === 'all') {
        let fs = require('fs');
        let path = process.cwd() + '/data/parser/blog';

        let blogList = fs.readdirSync(path);
        let result = JSON.parse('[]');
        let counter = 1;

        blogList.forEach(file => {
            let parser = require('./blog/' + file);
            parser.getData(function (data) {
                result.push(data);
                counter === blogList.length ? rootCallback(data) : counter++;
            });
        });
    } else {
        try {
            let parser = require('./blog/' + type);
            parser.getData(function (result) {
                rootCallback(result);
            });
        } catch (exception) {
            let resultItem = require('./result_item');
            let data = resultItem.getResultItem();
            data.blog_name = 'NODATA';
            rootCallback(data);
        }
    }
};