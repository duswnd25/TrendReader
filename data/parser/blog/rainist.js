// TODO 변경필요
const blogName = 'Rainist';
const rootUrl = 'https://medium.com/rainist-engineering';

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            // Title
            let blogName = $('title').eq(0).text().substring(0, 20);

            // Title
            let parseTitle = $('div.u-letterSpacingTight.u-lineHeightTighter.u-fontSize24').eq(0).text();
            let parseLink = $('div.u-lineHeightBase.postItem').eq(0).children('a').eq(0).attr('href');

            // Header
            let parsingHeaderSrc = $('div.u-lineHeightBase.postItem').eq(0).children('a').eq(0).css('background-image');
            parsingHeaderSrc = parsingHeaderSrc.replace('url(','').replace(')','').replace(/\"/gi, "");

            // Summary
            let parseSummary = $('div.u-contentSansThin.u-lineHeightBaseSans.u-fontSize24.u-xs-fontSize18').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + 'https://rainist.com/';
            result.blog_header_src = parsingHeaderSrc;
            result.article_title = parseTitle;
            result.article_link = parseLink;
            result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
            result.blog_type = 'C';

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};