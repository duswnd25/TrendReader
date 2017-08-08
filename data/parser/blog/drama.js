// TODO 변경필요
const blogName = 'Drama & Company';
const rootUrl = 'http://blog.dramancompany.com/category/develop/';
const headerSrc = 'http://blog.dramancompany.com/wp-content/uploads/2015/11/2000_dark.png';

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
            let titleItem = $('h2.title').eq(0);
            let parseTitle = titleItem.children('a').text();
            let parseLink = titleItem.children('a').attr('href');

            // Date
            let parseDate = ''; // 메인화면에 표시되지 않음

            // Summary
            let parseSummary = $('div.row').eq(0)
                .children('div.post-770.post.type-post.status-publish.format-standard.hentry.category-develop.tag-aws.tag-code-deploy.tag-23.post-container.masonry-element.col-md-4')
                .eq(0).children('div.post-article').eq(0).children('p').eq(0).text();

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