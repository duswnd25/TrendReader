require ('newrelic');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 1234;


const mainRouter = require('./router/main/main.js')(app);
const apiRouter = require('./router/api/blog.js')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = app.listen(port, function () {
    console.log("Trend Reader Working on Port " + port)
});