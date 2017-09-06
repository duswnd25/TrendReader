const port = process.env.PORT || 1234;

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
app.use('/', require('./router/main/main.js'));
app.use('/api/data', require('./router/api/data'));

app.listen(port, function () {
    console.log("Trend Reader Working on Port " + port);
});