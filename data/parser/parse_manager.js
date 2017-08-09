exports.getData = function (type, rootCallback) {
    if (type === 'all') {
        const fs = require('fs');
        let path = "/folderPath";

        fs.readdir(path, function (err, folders) {

            for (let i = 0; i < folders.length; i++) {
                let folder = folders[i];
                let fPath = path + "/" + folder;  // 하위 폴더 경로 반환
                let files = fs.readdirSync(fPath);  // 하위 폴더 내 파일 검색
                console.log(fPath);
                console.log(files);
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