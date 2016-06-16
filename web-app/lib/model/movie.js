const mongoose = require("mongoose");

schema = mongoose.Schema({
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

mongoose.model("movie", schema);
