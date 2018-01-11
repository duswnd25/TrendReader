const DBManager = require("./../data/db/database_manager");
const Fcm = require("./fcm/fcm_send");

let time = new Date().getTime();
let isMorning;
let channel;

if (time === 7) {
    isMorning = true;
    channel = "MORNING"
} else if (time === 18) {
    isMorning = false;
    channel = "EVENING"
}

DBManager.getNewDataCount(isMorning, function (count) {
    Fcm.sendFCM(channel, count+"개 의 안읽은 소식이 있습니다.");
});