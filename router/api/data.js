const rootPath = process.cwd();
const dbManager = require(rootPath + '/data/db/db_manager');
const parseManager = require(rootPath + '/data/parser/parse_manager');

module.exports = function (app) {
    app.get('/api/data/read/:type', (req, res) => {
        dbManager.getRecentData(req.params.type, function (result) {
            if (result.name === 'NODATA') {
                return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.type});
            } else {
                return res.json(result);
            }
        });
    });

    app.get('/api/data/parse/:type', (req, res) => {
        parseManager.parseData(req.params.type);
        return res.status(200).json({success: '명령어 전달 완료.'});
    });

    app.get('/api/data/test/:type', (req, res) => {
        dbManager.saveNewData(req.params.type,JSON.parse('{\n' +
            '        "name": "기술 블로그 – DRAMA&COMPA",\n' +
            '        "favicon_src": "https://www.google.com/s2/favicons?domain=http://blog.dramancompany.com/category/develop/",\n' +
            '        "header_src": "http://blog.dramancompany.com/wp-content/uploads/2015/11/2000_dark.png",\n' +
            '        "title": " AWS Code Deploy를 통한 배포 자동화",\n' +
            '        "link": " http://blog.dramancompany.com/2017/04/aws-code-deploy%eb%a5%bc-%ed%86%b5%ed%95%9c-%eb%b0%b0%ed%8f%ac-%ec%9e%90%eb%8f%99%ed%99%94/",\n' +
            '        "summary": "서버 배포는 단순하고 반복작업이지만 절차가 적지 않아 실수를 할 가능성이 높습니다. 또 한번의 실수는 커다란 시스템 장애로 이루어질 수 있기 때문에 많은 분들에게 배포란 꽤나 부담스럽고 큰 업무로 느껴집니다. 특히 하루에 여러번의 배포를 진행해야 하는 날이면 시간도 시간이지만 스트레스가 크죠. 드라마앤컴퍼니에서 이전까지는 서버 배포를 진행하는 개발자가 몇 ",\n' +
            '        "type": "C",\n' +
            '        "timestamp": "2017-08-15T08:31:17.063Z"\n' +
            '    }'));
        return res.status(200).json({success: '명령어 전달 완료.'});
    });
};