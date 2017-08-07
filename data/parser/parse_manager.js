const lezhin = require('./blog/parse_lezhin');
const drama = require('./blog/parse_drama');
const rainist = require('./blog/parse_rainist');

exports.getData = function (type, rootCallback) {
    switch (type) {
        case 'lezhin':
            lezhin.getData(function (result) {
                rootCallback(result);
            });
            break;
        case 'drama':
            drama.getData(function (result) {
                rootCallback(result);
            });
            break;
        case 'rainist':
            rainist.getData(function (result) {
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