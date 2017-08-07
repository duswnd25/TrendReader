const lezhin = require('./blog/parse_lezhin');

exports.getData = function (type, rootCallback) {
    switch (type) {
        case 'lezhin':
            lezhin.getData(function (result) {
                rootCallback(result);
            });
            break;
        default:
            const resultItem = require('./result_item');
            let data = resultItem.getResultItem();
            data.blog_name = 'NODATA';
            rootCallback(data);
    }
}