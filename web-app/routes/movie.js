const express = require("express");
const mongoose = require("mongoose");
const Movie = mongoose.model("movie");
const router = express.Router();

router.get("/", (req, res) => {
    Movie.findMostRecent(100, (error, movies) => {
        res.render("movie/index", {
            movies
        });
    });
});

router.get("/search", (req, res) => {
    if (req.query.k === undefined || req.query.k === null || req.query.k.trim() === "")
    {
        res.redirect("./");
    }
    else
    {
        const keyword = req.query.k.trim();
        Movie.searchByKeyword(keyword, (error, movies) => {
            res.render("movie/search", {
                keyword,
                movies
            });
        });
    }
});

module.exports = router;
