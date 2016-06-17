const mongoose = require("mongoose");

const schema = mongoose.Schema({
    subjectId: { type: String, index: true, unique: true },
    watchedDate: { type: Date, default: Date.now }
}, {
    collection: "watched"
});

schema.statics.watch = function(id, cb) {
    this.findOne({ subjectId: id }, (error, subject) => {
        if (!subject)
        {
            this.insertMany([ { subjectId: id } ], cb);
        }
        else
        {
            if (typeof(cb) === "function")
            {
                cb();
            }
        }
    });
};

schema.statics.unwatch = function(id, cb) {
    this.findOne({ subjectId: id }, (error, subject) => {
        if (subject)
        {
            this.remove({ subjectId: id }, cb);
        }
        else
        {
            if (typeof(cb) === "function")
            {
                cb();
            }
        }
    });
};

mongoose.model("watched", schema);
