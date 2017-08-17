const rootPath = process.cwd();
const DbManager = require(rootPath + '/data/db/db_manager');

module.exports = function (app) {
    app.get('/api/data/test/:tagName', (req, res) => {
        DbManager.saveTest(req.params.tagName);
        return res.status(200).json({success: '명령어 전달 완료.'});
    });
};