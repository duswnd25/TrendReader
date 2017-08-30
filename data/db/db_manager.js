const Mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const DB_URL = process.env.MONGODB_URI || 'mongodb://heroku_m5w3c3x6:9fidp1ll6gr7hcvmsqe7pdhlfe@ds161483.mlab.com:61483/heroku_m5w3c3x6';
require('events').EventEmitter.prototype._maxListeners = 100;

Mongoose.connect(DB_URL, {useMongoClient: true});

// 새 데이터인지 확인하는 함수
exports.isNewData = function (blogId, parseTitle, rootCallback) {
    let dbConnection = Mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'DB : connection error:'));
    dbConnection.once('open', function callback() {
        console.log('DB    : Connect');
        PostSchema.findOne({title: parseTitle}, function (err, docs) {
            if (err) {
                console.log(err);
            }
            console.log('DB : ' + blogId + ' ' + docs === null);
            rootCallback(docs === null);
        });
    });
};


// 새 데이터로 덮어쓰는 함수
exports.updateData = function (blogId, data) {
    let dbConnection = Mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'DB : connection error:'));
    dbConnection.once('open', function callback() {
        PostSchema.findOne({id: blogId}, function (err, docs) {
            if (err) {
                console.log(err);
            }

            docs.id = data.id;
            docs.favicon_src = data.favicon_src;
            docs.title = data.title;
            docs.name = data.name;
            docs.link = data.link;
            docs.summary = data.summary;
            docs.type = data.type;
            docs.save(function (err) {
                if (err) {
                    console.error('DB : Update Error');
                } else {
                    console.log('DB : Update Success');
                }
            });
        });
    });
};

// 새 데이터로 덮어쓰는 함수
exports.removeData = function (blogId) {
    let feed = new PostSchema();
    feed.title = "";
    feed.id = blogId;
    feed.name = "";
    feed.favicon_src = "";
    feed.link = "";
    feed.summary = "";
    feed.type = "";

    feed.save(function (err) {
        if (err) throw err;
        console.log("DB : 값 삭제");
    });
};

// 최근 값 가져오기
exports.getRecentData = function (blogId, rootCallback) {
    let dbConnection = Mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'DB : connection error:'));
    dbConnection.once('open', function callback() {
        console.log('DB : Read ' + blogId);
        if (blogId === 'all') {
            PostSchema.findOne(function (err, docs) {
                if (err) {
                    console.log(err);
                }
                rootCallback(docs);
            });
        } else {
            PostSchema.findOne({id: blogId}, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                rootCallback(docs);
            });
        }
    });
};