const Mongoose = require('mongoose');
let PostSchema = require('./post_schema');

// 새 데이터인지 확인하는 함수
exports.isNewData = function (blogId, parseTitle, rootCallback) {
    Mongoose.connect(process.env.MONGODB_URI);
    let tempPost = new PostSchema();

    let db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'DB : connection error:'));
    db.once('open', function callback() {
        console.log('DB    : Connect');
        tempPost.findOne({title: parseTitle}, function (err, docs) {
            if (err) {
                console.log(err)
            }
            Mongoose.disconnect();
            rootCallback(docs === null)
        });
    });
};


// 새 데이터로 덮어쓰는 함수
exports.updateData = function (blogId, data) {
    let feed = new PostSchema();
    feed.id = data.id;
    feed.favicon_src = data.favicon_src;
    feed.title = data.title;
    feed.name = data.name;
    feed.link = data.link;
    feed.summary = data.summary;
    feed.type = data.type;

    feed.update({ id: blogId }, { $set: data }, function(err, output){
        console.log(output);
    })
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

    feed.save(function(err) {
        if (err) throw err;
        console.log("DB : 값 삭제");
    });
};

// 최근 값 가져오기
exports.getRecentData = function (blogId, rootCallback) {
    console.log('Realm : 읽기 ' + blogId);
    if (blogId === 'all') {
        PostSchema.find(function (err, feed) {
            if (err) {
                console.error(err);
            }
            rootCallback(feed);
        })
    } else {
    }
};