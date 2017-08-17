const rootPath = process.cwd();
const DbManager = require(rootPath + '/data/db/db_manager');
const ParseManager = require(rootPath + '/data/parser/parse_manager');

module.exports = function (app) {
    app.get('/api/data/read/:type', (req, res) => {
        DbManager.getRecentData(req.params.type, function (result) {
            if (result.name === 'NODATA') {
                return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.type});
            } else {
                return res.status(200).json(result);
            }
        });
    });

    app.get('/api/data/parse/:type', (req, res) => {
        ParseManager.parseData(req.params.type);
        return res.status(200).json({success: '명령어 전달 완료.'});
    });
};