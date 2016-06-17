const mongoose = require("mongoose");
const schema = mongoose.Schema({
    subjectId: { type: String, index: true, unique: true },
    subjectType: { type: String, index: true },
    markTime: { type: Date, default: Date.now }
}, {
    collection: "SubjectMark"
});




__watchedSubjectIds = null;
schema.statics.hasWatched = function(id) {
    return __watchedSubjectIds.includes(id);
};
schema.statics.getWatchedSubjectIds = function() {
    return __watchedSubjectIds;
};
schema.statics.loadWatchedSubjectIds = function() {
    this.find((error, marks) => {
        if (!error)
        {
            __watchedSubjectIds = marks.map(mark => mark.subjectId);
        }
    });
};



schema.statics.watch = function(id, cb) {
    if (!this.hasWatched(id))
    {
        const Subject = require("./Subject");
        Subject.findBySubjectId(id, (error, subject) => {
            if (!error && subject)
            {
                this.insertMany([ { subjectId: id, subjectType: subject.subjectType } ], cb);
                __watchedSubjectIds.push(id);
            }
        });
    }
    else
    {
        if (typeof(cb) === "function")
        {
            cb();
        }
    }
};

schema.statics.unwatch = function(id, cb) {
    if (this.hasWatched(id))
    {
        const ids = this.getWatchedSubjectIds();
        const index = ids.indexOf(id);
        if (index !== -1)
        {
            ids.splice(index, 1);
            this.remove({ subjectId: id }, cb);
        }
    }
    else
    {
        if (typeof(cb) === "function")
        {
            cb();
        }
    }
};

module.exports = mongoose.model("SubjectMark", schema);
