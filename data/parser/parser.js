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

    Request(item.url, function (error, response, body) {
        if (error) {
            console.error('PARSER : REQUEST ERROR = ' + error.code);
            console.error(error.message);
        }

        let $ = Cheerio.load(body);

        let articleItem = $('li.regularitem').eq(0);
        let titleItem = articleItem.children('h4.itemtitle').eq(0).children('a').eq(0);

        let title = titleItem.text();
        let link = titleItem.attr('href');
        let content = articleItem.children('div.itemcontent').eq(0).text();

        let data = {
            'post_title': title,
            'post_url': link,
            'post_content': content
        };

        DBManager.isNewData(link, function (isNewData) {
            if (isNewData) DBManager.updateData(item.blog_tag, data);
        });
    });
}