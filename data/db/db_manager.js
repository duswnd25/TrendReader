const Mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://heroku_m5w3c3x6:9fidp1ll6gr7hcvmsqe7pdhlfe@ds161483.mlab.com:61483/heroku_m5w3c3x6';
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
    category: {type: [], required: true},
    timestamp: {type: Date, default: Date.now(), required: true}
});

let PostModel = Mongoose.model('Post', PostSchema);
// DB 스키마 끝

// 새 데이터 여부
exports.isNewData = function (blogId, parseLink, rootCallback) {
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
            console.info('DB : NEW DATA = ' + blogId + " = " + (post.link !== parseLink));
            rootCallback(post.link !== parseLink);
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
    tempPost.category = ['NO'];

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
            'timestamp': Date.now(),
            'category': data.category
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
exports.getDataByBlog = function (blogId, rootCallback) {
    if (blogId === 'all') {
        PostModel.find({}).sort({timestamp: 'desc'}).exec(function (err, posts) {
            if (err) {
                console.error('DB : GET DATA ERROR = ' + blogId);
                console.error(err)
            }
            for (let index = 0; index < posts.length; index++) {
                let temp = JSON.parse(JSON.stringify(posts[index]));
                temp.timestamp = new Date(temp.timestamp).getCustomType();
                posts[index] = temp;
            }
            rootCallback(posts === null ? "" : posts);
        });
    } else {
        PostModel.findOne({blogId: blogId}, function (err, post) {
            if (err) {
                console.error('DB : GET DATA ERROR = ' + blogId);
                console.error(err)
            }

            // 왜 post 를 직접 변경하면 반영이 안되는지 모르겠다.
            let temp = JSON.parse(JSON.stringify(post));
            temp.timestamp = new Date(temp.timestamp).getCustomType();
            rootCallback(temp);
        });
    }
};

exports.getDataByCategory = function (category, rootCallback) {
    PostModel.find({category: category}).sort({timestamp: 'desc'}).exec(function (err, posts) {
        if (err) {
            console.error('DB : GET DATA ERROR = ' + blogId);
            console.error(err)
        }
        for (let index = 0; index < posts.length; index++) {
            let temp = JSON.parse(JSON.stringify(posts[index]));
            temp.timestamp = new Date(temp.timestamp).getCustomType();
            posts[index] = temp;
        }
        rootCallback(posts === null ? "" : posts);
    });
};

Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = this.getHours().toString();
    let minute = this.getMinutes().toString();
    return year + '년 ' + month + '월 ' + date + '일 ' + hour + '시 ' + minute + '분';
};