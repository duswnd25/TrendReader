exports.getData = function (type, rootCallback) {
    if (type === 'all') {
        let fs = require('fs');
        let path = process.cwd() + '/data/parser/blog';

        let blogList = fs.readdirSync(path);
        let result = '[';
        let counter = 1;

        blogList.forEach(file => {
                let parser = require('./blog/' + file);
                parser.getData(function (data) {
                    data = JSON.stringify(data);
                    result += result === '[' ? data : ',' + data;
                    if (counter === blogList.length) {
                        result += ']';
                        rootCallback(JSON.parse(result))
                    }
                    else {
                        counter++;
                    }
                });
            }
        );
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
}
;