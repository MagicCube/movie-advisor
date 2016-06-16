const express = require("express");
const mongoose = require("mongoose");
const Movie = mongoose.model("movie");
const router = express.Router();

router.get("/", (req, res) => {
    pageIndex = 0;
    if (req.query.p)
    {
        pageIndex = parseInt(req.query.p);
    }
    Movie.findMostRecent(pageIndex, 100, (error, movies) => {
        res.render("movie/index", {
            movies
        });
    });
});

router.get("/watched", (req, res) => {
    Movie.findWatched((error, movies) => {
        res.render("movie/search", {
            keyword: "已看过",
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
