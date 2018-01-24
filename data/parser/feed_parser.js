// 파서는 구글 Feed Burner에 등록한 주소를 서버에 저장 후
// 별도의 스케줄러로 가져온다.
const DBManager = require("./../db/database_manager");
const FeedParser = require("feedparser");
const Request = require("request");
const Fcm = require("./../../service/fcm/fcm_send");

exports.parseFeed = function (item) {

    let req = Request(item.feed_url);
    let feedParser = new FeedParser({});

    req.on("error", function (error) {
        console.error("PARSER : REQUEST ERROR = " + item.blog_url);
        console.error(error.message);
    });

    req.on("response", function (res) {
        let stream = this;
        if (res.statusCode !== 200) {
            this.emit("error", new Error("Bad status code"));
        }
        else {
            stream.pipe(feedParser);
        }
    });

    feedParser.on("error", function (error) {
        console.error("PARSER : FEED PARSER ERROR = " + error.code);
        console.error(error.message);
    });

    feedParser.once("readable", function () {
        let stream = this;
        let meta = this.meta;
        let feed = stream.read();

        // 내용
        let postContent = feed.summary || feed.description;

        postContent.replace(/<br\/>/ig, "\n");
        postContent = postContent.replace(/(<([^>]+)>)/ig, "");

        // 글 링크
        let postLink = (feed.link === undefined ? item.blog_url : feed.link).toString();

        if (!postLink.includes("http")) {
            postLink = item.blog_url + postLink;
        }

        let data = {
            "blog_name": meta.title,
            "post_title": feed.title,
            "post_url": postLink,
            "post_content": postContent,
            "profile_url": ""
        };

        DBManager.isNewData(feed.title, function (error, isNewData) {
            if (isNewData && !error) {
                const ogs = require('open-graph-scraper');
                ogs({'url': item.blog_url, 'timeout': 4000}, function (error, results) {
                    if (error !== null) {
                        try {
                            if (results.data.ogTitle !== undefined) {
                                data["blog_name"] = results.data.ogTitle + " " + results.data.ogDescription;
                            }
                            if (results.data.ogImage.url !== undefined) {
                                data.profile_url = results.data.ogImage.url;
                            }
                        } catch (e) {
                            console.error(item.blog_url + " / " + e);
                        }
                    }
                    DBManager.updateData(data);
                    Fcm.sendFCM("QUICK", data.blog_name, data.post_title);
                });
            }
        });
    });
};