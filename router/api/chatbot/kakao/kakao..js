const ResponseGenerator = require('./response_generator');
const Express = require('express');

const router = Express.Router();

// 메인메뉴
router.get('/keyboard', (req, res) => {
    res.set({
        'content-type': 'application/json',
        encoding: 'UTF-8'
    }).send(JSON.stringify({
        type: 'buttons',
        buttons: ResponseGenerator.rootMenu
    }));
});

// 메시지
router.post('/message', (req, res) => {
    res.set({
        'content-type': 'application/json',
        encoding: 'UTF-8'
    });

    let userInput = req.body.content.toString();

    switch (userInput) {
        default:
            res.send(JSON.stringify(ResponseGenerator.typeText('지원하지 않습니다.')));
    }
});

// 친구등록
router.post('/friend', (req, res) => {
    res.set({
        'content-type': 'application/json',
        encoding: 'UTF-8'
    }).send(JSON.stringify({success: true}));
});

// 차단
router.delete('/friend', (req, res) => {
    res.set({
        'content-type': 'application/json',
        encoding: 'UTF-8'
    }).send(JSON.stringify({success: true}));
});

module.exports = router;