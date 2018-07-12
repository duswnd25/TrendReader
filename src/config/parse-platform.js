const parseServer = require("parse-server").ParseServer;
const parseDashboard = require("parse-dashboard");

/** ================== SERVER CONFIG ================== **/
const DB_URL = process.env.MONGODB_URI;
const SERVER_URL = process.env.SERVER_URL;
const APP_NAME = process.env.APP_NAME;
const APP_ID = process.env.APP_ID;
const FILE_KEY = process.env.FILE_KEY;
const MASTER_KEY = process.env.MASTER_KEY;
const ALLOW_INSECURE_HTTP = true;

/** ================== PARSE SERVER & DASHBOARD ================== **/
exports.ParseServer = function () {
    return new parseServer({
        databaseURI: DB_URL,
        appId: APP_ID,
        masterKey: MASTER_KEY,
        fileKey: FILE_KEY,
        serverURL: SERVER_URL
    });
};

// Parse Platform Dashboard
exports.Dashboard = function () {
    return new parseDashboard({
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
};