// TODO 변경필요
const blogName = 'Spoqa';
const rootUrl = 'https://spoqa.github.io/';
const headerSrc = 'https://spoqa.github.io/images/logo.png';

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
            let parseTitle = $('span.post-title-words').eq(0).text();
            let parseLink = $('h2.post-title').eq(0).children('a').eq(0).attr('href');

            // Date
            let parseDate = $('span.post-date').eq(0).text();

            // Summary
            let parseSummary = $('p.post-description').eq(0).text();

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            data.blog_header_src = headerSrc;
            data.article_title = parseTitle.length > 16 ? parseTitle.substring(0, 16) : parseTitle;
            data.article_date = parseDate;
            data.article_link = rootUrl + parseLink;
            data.article_summary = parseSummary.length > 100 ? parseSummary.substring(0, 100) + '...' : parseSummary;

            rootCallback(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}