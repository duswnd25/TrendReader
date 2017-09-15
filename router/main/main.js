const Express = require('express');
const Router = Express.Router();

Router.get('/', function (req, res) {
    res.render('index.html')
});

Router.get('/server_time', (req, res) => {
    return res.status(200).json({success: (Date.now()).getCustomType()});
});

Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = this.getHours().toString();
    let minute = this.getMinutes().toString();
    let second = this.getSeconds().toString();
    return year + '년 ' + month + '월 ' + date + '일 ' + hour + '시 ' + minute + '분 ' + second + '초';
};

module.exports = Router;