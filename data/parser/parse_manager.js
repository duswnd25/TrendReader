exports.getData = function (type, rootCallback) {
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