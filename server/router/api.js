const express = require('express');
const app = express.Router();

const DbManager = require('../data/db/db_manager');
const parseManager = require('../data/parser/parse_manager');

app.get('/data/read/:blogId', (req, res) => {
    DbManager.getRecentData(req.params.blogId, function (result) {
        if (result.name === 'NODATA') {
            return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.blogId});
        } else {
            return res.json(result);
        }
    });
});

app.get('/data/parse/:blogId', (req, res) => {
    parseManager.parseData(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 파싱'});
});

app.get('/data/remove/:blogId', (req, res) => {
    DbManager.removeData(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 삭제'});
});

module.exports = app;