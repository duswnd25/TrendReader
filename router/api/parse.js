const ParserManager = require('../../data/parser/parse_manager');
const Express = require('express');
const Router = Express.Router();

// 파싱
Router.get('/:blog_tag', (req, res) => {
    ParserManager.start(req.params.blog_tag);
    return res.status(200).json({success: req.params.blog_tag + ' 파싱'});
});

module.exports = Router;