const express = require("express");
const models = require("../lib/models");
const Subject = models.Subject;

const router = express.Router();

router.get("/", (req, res) => {
    pageIndex = 0;
    if (req.query.p)
    {
        pageIndex = parseInt(req.query.p);
    }
    Subject.findMostRecent(pageIndex, 100, (error, subjects) => {
        res.render("subject/index", {
            subjects
        });
    });
});

router.get("/watched", (req, res) => {
    Subject.findWatched((error, subjects) => {
        res.render("subject/search", {
            keyword: "",
            subjects
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
        Subject.searchByKeyword(keyword, (error, subjects) => {
            res.render("subject/search", {
                keyword,
                subjects
            });
        });
    }
});

module.exports = router;
