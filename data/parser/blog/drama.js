// TODO 변경필요
const rootUrl = 'http://blog.dramancompany.com/category/develop/';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        let result = resultItem.getResultItem();
        if (body) {
            let $ = cheerio.load(body);

            // Name
            let blogName = $('title').eq(0).text();

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
            result.name = blogName;
            result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.title = parseTitle;
            result.link = parseLink;
            result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
            result.category = ['company', 'tech', 'vision', 'db'];

            rootCallback(result);
        } else {
            result.name = "";
            rootCallback(result);
        }
    });
};