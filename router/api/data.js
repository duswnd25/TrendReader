let rootPath = process.cwd();
let dbManager = require(rootPath + '/data/db/db_manager');

module.exports = function (app) {
    app.get('/api/blog/:type', (req, res) => {
        dbManager.getRecentData(req.params.type, function (result) {
            if (result.blog_name === 'NODATA') {
                return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.type});
            } else {
                return res.json(result);
            }
        });
    });
};