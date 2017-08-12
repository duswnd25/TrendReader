// New Relic
const port = process.env.PORT || 1234;

// Module
const newrelic = require('newrelic');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const express = require('express');
const compression = require('compression');

// Parse Manager
const parseManager = require(process.cwd() + '/data/parser/parse_manager');

// Express 설정
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/*
// gzip
app.use(compression());
*/
// Router
const mainRouter = require('./router/main/main.js')(app);
const apiRouter = require('./router/api/data.js')(app);

const server = app.listen(port, function () {
    console.log("Trend Reader Working on Port " + port);

    // 매 30분 반복
    let scheduler = schedule.scheduleJob('* 30 * * * *', function () {
        parseManager.parseData('all');
    });
});