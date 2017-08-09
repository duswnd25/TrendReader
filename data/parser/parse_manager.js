exports.getData = function (type, rootCallback) {
    if (type === 'all') {
        const fs = require('fs');
        let path = "/folderPath";

        fs.readdir(path, function (err, items) {
            console.log(items);
            for (let index = 0; index < items.length; index++) {
                console.log(items[index]);
            }
        });
    } else {
        try {
            const parser = require('./blog/' + type);
            parser.getData(function (result) {
                rootCallback(result);
            });
        } catch (exception) {
            const resultItem = require('./result_item');
            let data = resultItem.getResultItem();
            data.blog_name = 'NODATA';
            rootCallback(data);
        }
    }
}