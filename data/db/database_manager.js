const Parse = require('parse/node');
const PostItem = require('./../post_item');

// Server init
Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;

// 새 데이터 여부
exports.isNewData = function (blog_url, callback) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);
    query.equalTo('post_url', blog_url);
    query.count({
        success: function (count) {
            count = String(count);
            console.log("DB : POST COUNT SUCCESS = " + count);
            console.log("DB : NEW POST = " + String(count === '0'));

            callback(null, count === '0');
        },
        error: function (error) {
            console.error("DB : POST COUNT ERROR = " + error.code);
            console.error(error.message);

            callback(error, null);
        }
    });
};

// 업데이트
exports.updateData = function (blog_tag, data) {

    console.log('DB : UPDATE DATE = ' + data.post_title);
    console.log('DB : UPDATE DATE = ' + data.post_url);
    console.log('DB : UPDATE DATE = ' + data.post_content);

    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);
    query.equalTo("blog_tag", blog_tag);
    query.first({
        success: function (result) {
            console.log("DB : UPDATE SUCCESS");

            result.post_title = data.post_title;
            result.post_url = data.post_url;
            result.post_content = data.post_content;
            result.save();
        },
        error: function (error) {
            console.error("DB : UPDATE ERROR = " + error.code);
            console.error(error.message);
        }
    });
};

exports.getData = function (target_column, user_query, callback) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);

    if (user_query !== 'all') {
        query.equalTo(target_column, user_query);
    }

    query.find({
        success: function (results) {
            let temp = [];
            results.forEach(function (item) {
                console.log("DB : FETCH DATA SUCCESS = " + item.get('blog_name'));

                let tempJson = PostItem.getResultItem();
                tempJson.blog_tag = item.get('blog_tag');
                tempJson.favicon_url = 'https://www.google.com/s2/favicons?domain=' + item.get('favicon_url');
                tempJson.blog_name = item.get('blog_name');
                tempJson.blog_url = item.get('blog_url');
                tempJson.post_title = item.get('post_title');
                tempJson.post_url = item.get('post_url');
                tempJson.post_content = item.get('post_content');
                tempJson.update_at = new Date(item.updatedAt).getCustomType();
                temp.push(tempJson);
            });
            callback(temp, null);
        },
        error: function (error) {
            console.error("DB : FETCH DATA ERROR = " + error.code);
            console.error(error.message);
            callback(null, error);
        }
    });
};

exports.getBlogList = function (callback) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);

    query.find({
        success: function (results) {
            let temp = [];
            results.forEach(function (item) {
                console.log("DB : FETCH FEED LIST SUCCESS = " + item.get('blog_name'));
                temp.push({
                    'blog_tag': item.get('blog_tag'),
                    'feed_url': item.get('feed_url')
                });
            });
            callback(temp, null);
        },
        error: function (error) {
            console.error("DB : FETCH FEED LIST ERROR = " + error.code);
            console.error(error.message);
            callback(null, error);
        }
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