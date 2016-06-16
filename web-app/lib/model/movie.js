const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: { type: String, index: true },
    year: String,
    imageUrl: String,
    imdb: { type: String, index: true },
    countries: [ String ],
    genres: [ String ],
    directors: [ String ],
    casts: [ String ],
    rating: Number,

    py_id: { type: String, index: true },
    py_url: String,

    watched: { type: Boolean, index: true }
}, {
    collection: "pianyuan.mv"
});

schema.statics.searchByKeyword = function(keyword, cb) {
    this.find({ title: new RegExp(keyword, 'i') }, cb);
};

schema.statics.findById = function(id, cb) {
    this.findOne({ _id: id }, cb);
};

schema.statics.findMostRecent = function(count, cb) {
    this.find().limit(count).exec(cb);
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
