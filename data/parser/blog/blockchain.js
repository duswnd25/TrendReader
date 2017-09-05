// TODO 변경필요
const rootUrl = 'http://theblockchain.kr/technology';

// Module
const request = require('request');
const cheerio = require('cheerio');

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
            let articleItem = $('div.articleListWrap.paddingT15.paddingB15').eq(0);

            // Title
            let titleItem = articleItem.children('div.listRight').eq(0)
                .children('div.articleListTitle.marginB8').eq(0)
                .children('a').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');
            parseLink = 'http://theblockchain.kr' + parseLink;

            // Summary
            let parseSummary = articleItem.children('div.listRight').eq(0).children('p.articleListCont').text();

            // Result
            result.name = blogName;
            result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.title = parseTitle;
            result.link = parseLink;
            result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
            result.category = ['news', 'tech'];
            rootCallback(result);
        } else {
            result.name = "";
            rootCallback(result);
        }
    });
};
