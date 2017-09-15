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

        let $ = Cheerio.load(body);

        let titleItem = $('h4.itemtitle').eq(0).children('a').eq(0);

        let title = titleItem.text();
        let link = titleItem.attr('href');
        let content = $('div.itemcontent').eq(0).text();

        console.log('PARSER : TITLE = ' + title);
        console.log('PARSER : LINK = ' + link);
        console.log('PARSER : CONTENT = ' + content);

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