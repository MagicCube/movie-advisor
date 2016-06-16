const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: String,
    year: String,
    imageUrl: String,
    imdb: String,
    countries: [ String ],
    genres: [ String ],
    directors: [ String ],
    casts: [ String ],
    rating: Number,

    py_id: String,
    py_url: String
}, {
    collection: "pianyuan.mv"
});

schema.statics.searchByKeyword = function(keyword, cb) {
    return this.find({ title: new RegExp(keyword, 'i') }, cb);
};

schema.statics.findById = function(id, cb) {
    return this.findOne({ _id: id }, cb);
};

schema.statics.findMostRecent = function(count, cb) {
    return this.find().limit(count).exec(cb);
};

mongoose.model("movie", schema);
