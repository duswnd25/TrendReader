// TODO 변경필요
const rootUrl = 'http://tosslab.github.io/';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        if (body) {
            let $ = cheerio.load(body);

            // Name
            let blogName = $('title').eq(0).text();

            // Article
            let articleItem = $('li.post.post__list').eq(0);

            // Title
            let titleItem = articleItem.children('h2.post__list-title').eq(0)
                .children('a').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Summary
            let parseSummary = articleItem.children('p.post__list-meta__description').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.name = blogName;
            result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.title = parseTitle;
            result.link = rootUrl + parseLink;
            result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
            result.category = ['company', 'tech', 'messenger'];

            rootCallback(result);
        } else {
            rootCallback("");
        }
    });
};