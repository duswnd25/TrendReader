const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index.html')
});

router.get('/server_time', (req, res) => {
    return res.status(200).json({success: Date.now()});
});

module.exports = router;

Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = this.getHours().toString();
    let minute = this.getMinutes().toString();
    let second = this.getSeconds().toString();
    return year + '년 ' + month + '월 ' + date + '일 ' + hour + '시 ' + minute + '분 ' + second + ' 초';
};