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

        // XML 모드로 해줘야 제대로 파싱이 된다.
        // LINK태그가 닫혀있지 않기 때문에 일반 모드에서는 link를 가져올 수 없다.
        let $ = Cheerio.load(body, {
            xmlMode: true
        });

        let item = $('item').eq(0);

        let title = item.children('title').eq(0).text();
        let link = item.children('link').eq(0).text();
        let content = item.children('description').eq(0).text();

        console.log('PARSER : TITLE = ' + title);
        console.log('PARSER : LINK = ' + link);
        console.log('PARSER : CONTENT = ' + content);

        let data = {
            'post_title': title,
            'post_url': link,
            'post_content': content
        };

        DBManager.isNewData(link, function (error, isNewData) {
            if (isNewData && !error) DBManager.updateData(item.blog_tag, data);
        });
    });
}