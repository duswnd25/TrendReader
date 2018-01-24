const NewRelic = require("newrelic");
const ParseServer = require("parse-server").ParseServer;
const ParseDashboard = require("parse-dashboard");
const BodyParser = require("body-parser");
const Express = require("express");
const Compression = require("compression");
const Favicon = require("serve-favicon");
const helmet = require("helmet");
const Parser = require("./data/parser/feed_parser");
const DBManager = require("./data/db/database_manager");

// Server Config
const DB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;
const APP_NAME = process.env.APP_NAME;
const APP_ID = process.env.APP_ID;
const FILE_KEY = process.env.FILE_KEY;
const MASTER_KEY = process.env.MASTER_KEY;
const ALLOW_INSECURE_HTTP = true;

// Parse Platform Server
const api = new ParseServer({
    databaseURI: DB_URL,
    cloud: process.cwd() + "/cloud/main.js",
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: FILE_KEY,
    serverURL: SERVER_URL,
    "filesAdapter": {
        "module": "parse-server-fs-adapter",
        "options": {
            "filesSubDirectory": "my/files/folder" // optional
        }
    }
});

// Parse Platform Dashboard
const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": SERVER_URL,
            "appId": APP_ID,
            "masterKey": MASTER_KEY,
            "appName": APP_NAME
        }
    ],
    "users": [
        {
            "apps": [{"appId": APP_ID}],
            "user": process.env.DASHBOARD_ID,
            "pass": process.env.DASHBOARD_PW
        }
    ],
    "trustProxy": 1
}, ALLOW_INSECURE_HTTP);

// Express 설정
const app = Express();
// user helmet for safety
app.use(helmet());

// disable for safety
app.disable("x-powered-by");

// gzip
app.use(Compression());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use("/public", Express.static(__dirname + "/public"));
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.locals.newrelic = NewRelic;

// Favicon
// From http://www.favicon-generator.org/
app.use(Favicon(__dirname + "/public/favicon/favicon-32x32.png"));

// Router
app.use("/parse", api);
app.use("/dashboard", dashboard);
app.use("/", require("./router/main/main.js"));
app.use("/api/data/read", require("./router/api/read"));

// Handle 404 - Keep this as a last route
app.use(function (req, res, next) {
    res.status(404);
    res.send("404: File Not Found");
    res.render("index.html");
});

const schedule = require('node-schedule');

// Parser Scheduler
let job = schedule.scheduleJob('* */5 * * *', function () {
    console.log("JOB START");
    DBManager.getData("blog", "all", function (results, error) {
        if (error) {
            console.error("PARSER : GET BLOG LIST ERROR = " + error.code);
            console.error(error.message);
        } else {
            console.log("DB PARSING LIST = " + results.size);
            results.forEach(function (item) {
                Parser.parseFeed(item)
            });
        }
    });
});

app.listen(PORT, function () {
    console.log("Trend Reader Working");
});