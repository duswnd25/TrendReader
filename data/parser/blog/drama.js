// TODO 변경필요
const rootUrl = 'http://blog.dramancompany.com/category/develop/';
let headerSrc = 'http://blog.dramancompany.com/wp-content/uploads/2015/11/2000_dark.png'; // 표시 없음

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
            let blogName = $('title').eq(0).text().substring(0, 20);

            // Article
            let articleItem = $('article').eq(0);

            // Title
            let titleItem = articleItem.children('div.post-article.post-title').eq(0)
                .children('h2.title').eq(0)
                .children('a').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Date
            let parseDate = ''; // 표시 없음

            /**
             * Summary
             * post-article 클래스를 가진 요소가 2가지 이기 때문에 1로 해줘야함
             */
            let parseSummary = articleItem.children('div.post-article').eq(1)
                .children('p').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = parseLink;
            result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
            result.blog_type = 'C';

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};