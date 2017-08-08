// TODO 변경필요
const blogName = 'SK README';
const rootUrl = 'http://readme.skplanet.com/';
const headerSrc = 'http://readme.skplanet.com/wp-content/themes/blaskan/img/bg_13header01.png';

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
            let articleItem = $('section#content').eq(0).children('article').eq(0);

            let parseTitle = articleItem.children('header').eq(0).children('h1').eq(0).children('a');
            let parseLink = rootUrl + parseTitle.attr('href');

            // Date
            let parseDate = articleItem.children('header').eq(0).children('time').eq(0).attr('datetime');

            // Summary
            let parseSummary = articleItem.children('div.content').text();

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            data.blog_header_src = headerSrc;
            data.article_title = parseTitle.text();
            data.article_date = parseDate;
            data.article_link = parseLink;
            data.article_summary = parseSummary;

            rootCallback(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}