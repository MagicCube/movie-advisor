const mongoose = require("mongoose");

const schema = mongoose.Schema({
    py_id: { type: String, index: true, unique: true },
    watchedDate: { type: Date, default: Date.now }
}, {
    collection: "watched"
});

schema.statics.watch = function(id, cb) {
    this.findOne({ py_id: id }, (error, movie) => {
        if (!movie)
        {
            this.insertMany([ { py_id: id } ], cb);
        }
        else
        {
            cb();
        }
    });
};

schema.statics.unwatch = function(id, cb) {
    this.findOne({ py_id: id }, (error, movie) => {
        if (movie)
        {
            this.remove([ { py_id: id } ], cb);
        }
        else
        {
            cb();
        }
    });
};

mongoose.model("watched", schema);
