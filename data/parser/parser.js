// 파서는 구글 Feed Burner에 등록한 주소를 서버에 저장 후
// 별도의 스케줄러로 가져온다.

const Cheerio = require('cheerio');
const Request = require('request');
const DBManager = require('./../db/database_manager');

DBManager.getBlogList(function (results, error) {
    if (error) {
        console.error('PARSER : GET BLOG LIST ERROR = ' + error.code);
        console.error(error.message);
    } else {
        console.log('PARSER : GET BLOG LIST SUCCESS');
        results.forEach(function (item) {
            parseFeed(item)
        });
    }
});

function parseFeed(item) {

    console.log('PARSER : BLOG TAG = ' + item.blog_tag);
    console.log('PARSER : BLOG URL = ' + item.feed_url);

    let requestOptions = {
        method: 'GET',
        uri: item.feed_url,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        },
        encoding: 'UTF-8'
    };

    Request(requestOptions, function (error, response, body) {
        if (error) {
            console.error('PARSER : REQUEST ERROR = ' + error.code);
            console.error(error.message);
        } else {
            console.log('PARSER : REQUEST SUCCESS');
        }

        let $ = Cheerio.load(body, {
            xmlMode: true
        });

        // Blog Data
        let info = $('channel').eq(0);
        let blogTitle = info.children('title').eq(0).text();
        let blogLink = info.children('description').eq(0).children('link').text(0);

        // Post Data
        let post = $('item').eq(0);
        let postTitle = post.children('title').eq(0).text();
        let postLink = post.children('link').eq(0).text();
        let postContent = post.children('description').eq(0).text();

        if (postContent.length > 250) {
            postContent = postContent.substring(0, 250);
        }

        console.log('PARSER : BLOG TITLE = ' + blogTitle);
        console.log('PARSER : BLOG LINK = ' + blogLink);
        console.log('PARSER : POST TITLE = ' + postTitle);
        console.log('PARSER : POST LINK = ' + postLink);
        console.log('PARSER : POST CONTENT = ' + postContent);

        let data = {
            'blog_tag': item.blog_tag,
            'blog_name': blogTitle,
            'blog_url': blogLink,
            'post_title': postTitle,
            'post_url': postLink,
            'post_content': postContent
        };

        DBManager.isNewData(postLink, function (error, isNewData) {
            if (isNewData && !error) DBManager.updateData(data);
        });
    });
}