// 파서는 구글 Feed Burner에 등록한 주소를 서버에 저장 후
// 별도의 스케줄러로 가져온다.
const DBManager = require("./../db/database_manager");
const FeedParser = require("feedparser");
const Request = require("request");

DBManager.getParsingList(function (results, error) {
    if (error) {
        console.error("PARSER : GET BLOG LIST ERROR = " + error.code);
        console.error(error.message);
    } else {
        console.log("PARSER : GET BLOG LIST SUCCESS");
        results.forEach(function (item) {
            parseFeed(item)
        });
    }
});

function parseFeed(item) {
    let req = Request(item.feed_url);
    let feedParser = new FeedParser({});

    req.on("error", function (error) {
        console.error("PARSER : REQUEST ERROR ");
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

        let postContent = feed.summary || feed.description;

        postContent.replace(/<br\/>/ig, "\n");
        postContent = postContent.replace(/(<([^>]+)>)/ig, "");

        if (postContent.length > 250) {
            postContent = postContent.substring(0, 250);
        }

        let postLink = feed.link || feed.origlink || meta.link;

        if (postLink === "" || postLink === null || !postLink.includes("http")) {
            postLink = item.blog_url;
        }

        let data = {
            "blog_tag": item.blog_tag,
            "blog_name": meta.title,
            "post_title": feed.title,
            "post_url": postLink,
            "post_content": postContent
        };

        DBManager.isNewData(postLink, function (error, isNewData) {
            if (isNewData && !error) {
                DBManager.updateData(data);
            }
        });
    });
}