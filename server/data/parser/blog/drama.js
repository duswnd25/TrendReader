// TODO 변경필요
const rootUrl = 'http://blog.dramancompany.com/category/develop/';
let headerSrc = 'http://blog.dramancompany.com/wp-content/uploads/2015/11/2000_dark.png'; // 표시 없음

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        let $ = cheerio.load(body);

        // Title
        let blogName = $('title').eq(0).text().substring(0, 20);

        // Article
        let articleItem = $('article').eq(0);

        // Title
        let titleItem = articleItem.children('div.post-article.post-title').eq(0)
            .children('h2.title').eq(0)
            .children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        /**
         * Summary
         * post-article 클래스를 가진 요소가 2가지 이기 때문에 1로 해줘야함
         */
        let parseSummary = articleItem.children('div.post-article').eq(1)
            .children('p').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.header_src = headerSrc;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};