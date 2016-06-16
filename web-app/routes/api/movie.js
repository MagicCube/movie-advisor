const express = require("express");
const mongoose = require("mongoose")
const Movie = mongoose.model("movie");
const router = express.Router();

const app = express();

router.get("/:id", (req, res, next) => {
    if (req.params.id !== "search")
    {
        Movie.findById(req.params.id, (error, movie) => {
            if (!error)
            {
                res.send({
                    successful: true,
                    result: movie
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
    }
    else
    {
        next();
    }
});

router.get("/search", (req, res) => {
    Movie.searchByKeyword(req.query.k, (error, movies) => {
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
