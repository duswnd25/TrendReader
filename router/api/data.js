const DbManager = require('../../data/db/db_manager');
const parseManager = require('../../data/parser/parse_manager');
const express = require('express');
const router = express.Router();

router.get('/read/:blogId', (req, res) => {
    DbManager.getData(req.params.blogId, function (result) {
        if (result.name === '' || result.name === null) {
            return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.blogId});
        } else {
            return res.json(result);
        }
    });
});

router.get('/parse/:blogId', (req, res) => {
    parseManager.parseData(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 파싱'});
});

router.get('/remove/:blogId', (req, res) => {
    DbManager.removeData(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 삭제'});
});

router.get('/parse/force_update/:blogId', (req, res) => {
    DbManager.removeData(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 강제 업데이트'});
});

module.exports = router;