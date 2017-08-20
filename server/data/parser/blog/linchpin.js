// TODO 변경필요
const rootUrl = 'http://www.linchpinsoft.com/blog/';

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
        let articleItem = $('article.post-summary.post-format-standard.clearfix').eq(0)
            .children('div.post-details').eq(0);

        // Title
        let titleItem = articleItem.children('h2.post-title').eq(0)
            .children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        // Header Image
        let parseHeaderSrc = articleItem.parent().eq(0)
            .children('div.post-image').eq(0)
            .children('a').eq(0)
            .children('img').attr('src');

        if (parseHeaderSrc === undefined) {
            parseHeaderSrc = 'https://secure.gravatar.com/avatar/a3e1cc7d4fd22fc93cb75bac34b31362?s=420';
        }

        // Summary
        let parseSummary = articleItem.children('p.post-excerpt').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.header_src = parseHeaderSrc;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};