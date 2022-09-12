const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewsStorySchema = new Schema({
    title:String,
    image:String,
    desc:String,
    category:String,
});

const newsStorySave = mongoose.model('NewsStorySave', NewsStorySchema);

module.exports = newsStorySave;