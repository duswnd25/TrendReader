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
