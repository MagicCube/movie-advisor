const mongoose = require("mongoose");

const schema = mongoose.Schema({
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

    py_id: { type: String, index: true },
    py_url: String,

    watched: { type: Boolean, index: true }
}, {
    collection: "movie"
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

schema.statics.watch = function(id, cb) {
    this.findOne({ py_id: id }, (error, movie) => {
        if (movie)
        {
            movie.set("watched", true);
            movie.save();
        }
        if (typeof(cb) === "function")
        {
            cb(error);
        }
    });
};

schema.statics.unwatch = function(id, cb) {
    this.findOne({ py_id: id }, (error, movie) => {
        if (movie)
        {
            movie.set("watched", false);
            movie.save();
        }
        if (typeof(cb) === "function")
        {
            cb(error);
        }
    });
};

mongoose.model("movie", schema);
