// TODO 변경필요
// D2는 Atom을 파싱한다.
const rootUrl = 'http://d2.naver.com/d2.atom';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

request(rootUrl, function (error, response, body) {

    if (error) {
        console.error(error);
    }

    let $ = cheerio.load(body);

    // Title
    let blogName = $('title').eq(0).text();

    let articleItem = $('entry').eq(0);
    let parseTitle = articleItem.children('title').eq(0).text();
    let parseLink = articleItem.children('link').eq(0).attr('href');
    let parseSummary = '';

    // Result
    let result = resultItem.getResultItem();
    result.name = blogName;
    result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
    result.title = parseTitle;
    result.link = parseLink;
    result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
});