const DbManager = require('../../data/db/database_manager');
const parseManager = require('../../data/parser/parse_manager');
const express = require('express');
const router = express.Router();

// 읽기
router.get('/read/blog/:blogId', (req, res) => {
    DbManager.getDataByBlog(req.params.blogId, function (result) {
        if (result.name === '' || result.name === null) {
            return res.status(404).json({error: '종류를 입력해주세요.', value: req.params.blogId});
        } else {
            return res.json(result);
        }
    });
});

router.get('/read/category/:category', (req, res) => {
    DbManager.getDataByCategory(req.params.category, function (result) {
        if (result.name === '' || result.name === null) {
            return res.status(404).json({error: '태그를 입력해주세요.', value: req.params.category});
        } else {
            return res.json(result);
        }
    });
});

// 파싱
router.get('/parse/:blogId', (req, res) => {
    parseManager.start(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 파싱'});
});

router.get('/parse/force_update/:blogId', (req, res) => {
    parseManager.forceUpdate(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 강제 업데이트'});
});

// 삭제
router.get('/remove/:blogId', (req, res) => {
    DbManager.removeData(req.params.blogId);
    return res.status(200).json({success: req.params.blogId + ' 삭제'});
});

module.exports = router;