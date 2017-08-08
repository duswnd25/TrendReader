const lezhin = require('./blog/lezhin');
const drama = require('./blog/drama');
const rainist = require('./blog/rainist');
const spoqa = require('./blog/spoqa');
const jandi = require('./blog/jandi');
const sk = require('./blog/sk');

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