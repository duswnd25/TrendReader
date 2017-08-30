const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FeedSchema = new Schema({
    objectId: ObjectId,
    id: 'string',
    name: 'string',
    favicon_src: 'string',
    title: 'string',
    link: 'string',
    summary: 'string',
    type: 'string',
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Feed', FeedSchema);