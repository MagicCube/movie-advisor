const mongoose = require("mongoose");

const schema = mongoose.Schema({
    subjectId: { type: String, index: true },
    subjectType: { type: String, index: true },
    mediaType: { type: String, index: true },
    title: { type: String, index: true },
    fullTitle: { type: String, index: true },
    year: Number,
    imageUrl: String,
    imdb: { type: String, index: true },
    countries: [ String ],
    genres: [ String ],
    directors: [ String ],
    casts: [ String ],
    rating: Number,
    addTime: Date,

    py_url: String
}, {
    collection: "Subject"
});

schema.statics.searchByKeyword = function(keyword, cb) {
    this.find({ fullTitle: new RegExp(keyword, 'i') }, cb);
};

schema.statics.findById = function(id, cb) {
    this.findOne({ _id: id }, cb);
};

schema.statics.findWatched = function(cb) {
    this.find({ watched: true }).exec(cb);
};

schema.statics.findMostRecent = function(pageIndex, pageSize, cb) {
    this.find().skip(pageIndex * pageIndex).limit(pageSize).exec(cb);
};

mongoose.model("subject", schema);
