const DBManager = require("./../db/database_manager");
const FeedParser = require("feedparser");
const Request = require("request");
const Cheerio = require('cheerio');
const Fcm = require("./../../service/fcm/fcm_send");

DBManager.getData("blog", "all", function (result, error) {
    if (error) {
        console.error("DB : GET BLOG LIST ERROR = " + error.code);
        console.error(error.message);
    } else {
        console.log("DB : GET BLOG LIST SUCCESS");
        console.log(typeof result);
        results.forEach(function (item) {
            parseFeed(item);
        });
    }
});

function parseFeed(item) {
    let request = Request(item.feed_url);
    let feedParser = new FeedParser({});
    let data = {
        "blog_name": "",
        "profile_url": "",
        "post_title": "",
        "post_url": "",
        "post_content": ""
    };

    request.on("error", function (error) {
        console.error("FEED PARSER : REQUEST ERROR ");
        console.error(error.message);
    });

    request.on("response", function (res) {
        let stream = this;
        if (res.statusCode !== 200) {
            this.emit("error", new Error("Bad status code"));
        }
        else {
            stream.pipe(feedParser);
        }
    });

    feedParser.on("error", function (error) {
        console.error("FEED PARSER : FEED PARSER ERROR = " + error.code);
        console.error(error.message);
    });

    feedParser.once("readable", function () {
        let stream = this;
        let meta = this.meta;
        let feed = stream.read();

        // 내용에서 태그를 정리한다.
        let postContent = feed.summary || feed.description;
        postContent.replace(/<br\/>/ig, "\n");
        postContent = postContent.replace(/(<([^>]+)>)/ig, "");

        // 글 링크
        let postLink = (feed.link === undefined ? item.blog_url : feed.link).toString();
        if (!postLink.includes("http")) {
            postLink = item.blog_url + postLink;
        }

        data.blog_name = meta.title;
        data.post_title = feed.title;
        data.post_url = postLink;
        data.post_content = postContent;

        DBManager.isNewData(feed.title, function (isNewData, error) {
            if (isNewData && !error) {
                Request(data.post_url, function (error, response, html) {
                    if (error) {
                        console.error("" + error.message);
                    }
                    let $ = Cheerio.load(html);

                    data.profile_url = $('meta[property="og:image"]').attr('content');

                    console.log("FEED PARSER : " + data.profile_image);

                    DBManager.updateData(data);
                    Fcm.sendFCM("QUICK", data.post_title, data.post_content);
                });
            }
        });
    });
}