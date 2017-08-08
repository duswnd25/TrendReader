// TODO 변경필요
const blogName = 'Lezhin Tech';
const rootUrl = 'http://tech.lezhin.com/';
const headerSrc = 'http://tech.lezhin.com/assets/img/lezhin_trans_128x128.png';

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
            let titleItem = $('h2.post-title').eq(0);
            let parseTitle = titleItem.children('a').text();
            let parseLink = rootUrl + titleItem.children('a').attr('href');

            // Date
            let parseDate = $('p.post-date').eq(0).text().trim();

            // Summary
            let parseSummary = $('div.post-summary').eq(0).text();

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
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