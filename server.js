const port = process.env.PORT || 1234;

// Module
const BodyParser = require('body-parser');
const Schedule = require('node-schedule');
const Express = require('express');
const Compression = require('compression');
const NewRelic = require('newrelic');

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

// gzip
app.use(Compression());

// Router
const mainRouter = require('./router/main/main.js')(app);
const apiRouter = require('./router/api/data.js')(app);

const server = app.listen(port, function () {
    console.log("Trend Reader Working on Port " + port);

    // 매 30분 반복
    let scheduler = Schedule.scheduleJob('* 30 * * * *', function () {
        ParseManager.parseData('all');
    });
});