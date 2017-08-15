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
        return res.status(404).json({success: '명령어 전달 완료.'});
    });
};