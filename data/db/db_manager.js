const Mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI;
Mongoose.connect(DB_URL);
Mongoose.Promise = global.Promise;

// DB 스키마 시작
const Schema = Mongoose.Schema;

let PostSchema = new Schema({
    blogId: {type: String, required: true, unique: true, index: true},
    name: {type: String, required: true},
    favicon_src: {type: String, required: true},
    title: {type: String, required: true},
    link: {type: String, required: true},
    summary: {type: String, required: true},
    timestamp: {type: Date, default: Date.now().getCustomType(), required: true}
});

let PostModel = Mongoose.model('Post', PostSchema);
// DB 스키마 끝

// 새 데이터 여부
exports.isNewData = function (blogId, parseTitle, rootCallback) {
    PostModel.findOne({blogId: blogId}, function (err, post) {
        if (err) {
            console.error('DB : NEW DATA CHECK ERROR = ' + blogId);
            console.error(err);
        }
        if (post === null) {
            createEmptyData(blogId, function () {
                rootCallback(true);
            });
        } else {
            console.info('DB : NEW DATA = ' + blogId + " = " + (post.title !== parseTitle));
            rootCallback(post.title !== parseTitle);
        }
    });
};

// 빈 데이터 생성
function createEmptyData(blogId, callback) {
    let tempPost = new PostModel();
    tempPost.blogId = blogId;
    tempPost.name = "NO";
    tempPost.favicon_src = "NO";
    tempPost.title = "NO";
    tempPost.link = "NO";
    tempPost.summary = "NO";
    tempPost.timestamp = Date.now();

    tempPost.save(function (err) {
        if (err) {
            console.error('DB : CREATE NEW DATA ERROR = ' + blogId);
            console.error(err);
        }
        console.info('DB : CREATE NEW DATA = ' + blogId);
        callback();
    });
}

// 업데이트
exports.updateData = function (blogId, data) {
    PostModel.update({'blogId': {$in: blogId}}, {
        $set: {
            'name': data.name,
            'favicon_src': data.favicon_src,
            'title': data.title,
            'link': data.link,
            'summary': data.summary,
            'timestamp': Date.now()
        }
    }, {multi: true}, function (err) {
        if (err) {
            console.error('DB : UPDATE ERROR = ' + blogId);
            console.error(err);
        }
        console.info('DB : UPDATE FINISH = ' + blogId);
    });
};

// 삭제
exports.removeData = function (blogId) {
    PostModel.remove({blogId: blogId}, function (err) {
        if (err) {
            console.error('DB : REMOVE ERROR = ' + blogId);
            console.error(err);
        } else {
            console.info('DB : REMOVE SUCCESS = ' + blogId);
        }
    });
};

// 가져오기
exports.getData = function (blogId, rootCallback) {
    if (blogId === 'all') {
        PostModel.find({}).sort({timestamp: 'desc'}).exec(function (err, posts) {
            if (err) {
                console.error('DB : GET DATA ERROR = ' + blogId);
                console.error(err)
            }
            rootCallback(posts === null ? "" : posts);
        });
    } else {
        PostModel.findOne({blogId: blogId}, function (err, post) {
            if (err) {
                console.error('DB : GET DATA ERROR = ' + blogId);
                console.error(err)
            }
            rootCallback(post);
        });
    }
};

Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = this.getHours().toString();
    let minute = this.getMinutes().toString();
    return year + '년 ' + month + '월' + date + '일 ' + hour + '시 ' + minute + '분';
};