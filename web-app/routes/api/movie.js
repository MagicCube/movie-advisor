const express = require("express");
const mongoose = require("mongoose")
const Movie = mongoose.model("movie");
const router = express.Router();

const app = express();

router.get("/:id", (req, res, next) => {
    if (req.params.id === "search")
    {
        next()
    }
});

router.get("/search", (req, res) => {
    Movie.find({ title: new RegExp(req.query.k, "i") }, (error, movies) => {
        if (!error)
        {
            res.send({
                successful: true,
                result: movies
            });
        }
        else
        {
            res.send({
                successful: false,
                error: {
                    message: error.message
                }
            });
        }
    });
});

module.exports = router;
