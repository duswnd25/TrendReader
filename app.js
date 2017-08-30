const port = process.env.PORT || 8000;

// Module
const BodyParser = require('body-parser');
const Schedule = require('node-schedule');
const Express = require('express');
const Compression = require('compression');
const NewRelic = require('newrelic');
const favicon = require('serve-favicon');

// Parse Manager
const ParseManager = require('./data/parser/parse_manager');

// Express 설정
const app = Express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use("/public", Express.static(__dirname + "/public"));
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

// Favicon
// From http://www.favicon-generator.org/
app.use(favicon(__dirname + '/public/favicon/favicon-32x32.png'));

// gzip
app.use(Compression());

// Router
const mainRouter = require('./router/main/main.js')(app);
const apiRouter = require('./router/api/data.js')(app);

const server = app.listen(port, function () {
    console.log("Trend Reader Working on Port " + port);

    // 매 10분 반복
    let scheduler = Schedule.scheduleJob('* */10 * * * *', function () {
        ParseManager.parseData('all');
    });
});