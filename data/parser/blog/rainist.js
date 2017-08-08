// TODO 변경필요
const blogName = 'Rainist';
const rootUrl = 'https://medium.com/rainist-engineering';
const headerSrc = 'https://rainist.com/static/e3d9ee1cbeb0f6c95295abcdbdaf9a33.svg';

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const rootPath = process.cwd();
const resultItem = require(rootPath + '/data/parser/result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            // Title
            let parseTitle = $('div.u-letterSpacingTight.u-lineHeightTighter.u-fontSize24').eq(0).text();
            let parseLink = $('div.u-lineHeightBase.postItem').eq(0).children('a').eq(0).attr('href');

            // Date
            let parseDate = $('time').eq(0).attr('datetime');

            // Summary
            let parseSummary = $('div.u-contentSansThin.u-lineHeightBaseSans.u-fontSize24.u-xs-fontSize18').eq(0).text();

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + 'https://rainist.com/';
            data.blog_header_src = headerSrc;
            data.article_title = parseTitle;
            data.article_date = parseDate;
            data.article_link = parseLink;
            data.article_summary = parseSummary;

            rootCallback(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}