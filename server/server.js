const port = process.env.PORT || 1234;

// Module
const BodyParser = require('body-parser');
const Schedule = require('node-schedule');
const Express = require('express');
const Compression = require('compression');
const NewRelic = require('newrelic');
const favicon = require('serve-favicon');
const path = require('path');

// Parse Manager
const ParseManager = require('./data/parser/parse_manager');

// Express 설정
const app = Express();
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use('/static', Express.static(path.resolve(__dirname, '..', 'public')));

// Favicon
// From http://www.favicon-generator.org/
app.use(favicon(__dirname + '/../public/favicon/favicon-32x32.png'));

// gzip
app.use(Compression());

// Router
const api = require('./router/api');
const index = require('./router/index');

app.use('/api', api);
app.use('/', index);

app.listen(port, function () {
    console.log("Trend Reader Working on Port " + port);

    // 매 10분 반복
    Schedule.scheduleJob('* */10 * * * *', function () {
        ParseManager.parseData('all');
    });
});