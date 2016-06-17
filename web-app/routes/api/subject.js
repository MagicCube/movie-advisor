const express = require("express");
const models = require("../../lib/models");
const Subject = models.Subject;
const SubjectMark = models.SubjectMark;

const router = express.Router();

const app = express();

router.get("/:id", (req, res, next) => {
    if (req.params.id !== "search")
    {
        Subject.findBySubjectId(req.params.id, (error, subject) => {
            if (!error)
            {
                res.send({
                    successful: true,
                    result: subject
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

router.post("/:id/watched", (req, res) => {
    if (req.params.id)
    {
        SubjectMark.watch(req.params.id, error => {
            if (!error)
            {
                res.send({ successful: true });
            }
            else
            {
                res.send({ successful: false, error: { message: error.message } });
            }
        });
    }
    else
    {
        res.send({ successful: false })
    }
});

router.post("/:id/unwatched", (req, res) => {
    if (req.params.id)
    {
        SubjectMark.unwatch(req.params.id, error => {
            if (!error)
            {
                res.send({ successful: true });
            }
            else
            {
                res.send({ successful: false, error: { message: error.message } });
            }
        });
    }
    else
    {
        res.send({ successful: false })
    }
});

router.get("/search", (req, res) => {
    Subject.searchByKeyword(req.query.k, (error, subjects) => {
        if (!error)
        {
            res.send({
                successful: true,
                result: subjects
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
