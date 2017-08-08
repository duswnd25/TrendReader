const lezhin = require('./blog/parse_lezhin');
const drama = require('./blog/parse_drama');
const rainist = require('./blog/parse_rainist');
const spoqa = require('./blog/parse_spoqa');
const jandi = require('./blog/parse_jandi');
const sk = require('./blog/parse_sk');

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
        case 'spoqa':
            spoqa.getData(function (result) {
                rootCallback(result);
            });
            break;
        case 'jandi':
            jandi.getData(function (result) {
                rootCallback(result);
            });
            break;
        case 'sk':
            sk.getData(function (result) {
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