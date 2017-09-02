// TODO 변경필요
const rootUrl = 'https://medium.com/rainist-engineering';

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
        let blogName = $('title').eq(0).text();

        // Title
        let parseTitle = $('div.u-letterSpacingTight.u-lineHeightTighter.u-fontSize24').eq(0).text();
        let parseLink = $('div.u-lineHeightBase.postItem').eq(0).children('a').eq(0).attr('href');

        // Summary
        let parseSummary = $('div.u-contentSansThin.u-lineHeightBaseSans.u-fontSize24.u-xs-fontSize18').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + 'https://rainist.com/';
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;

        rootCallback(result);
    });
};