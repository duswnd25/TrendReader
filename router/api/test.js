const DbManager = require('../../data/db/db_manager');

module.exports = function (app) {
    app.get('/api/data/test/:blogId', (req, res) => {
        DbManager.saveTest(req.params.blogId);
        return res.status(200).json({success: '명령어 전달 완료.'});
    });
};

module.exports = function (app) {
    app.get('/test', function (req, res) {
        res.render('test.html')
    });
};