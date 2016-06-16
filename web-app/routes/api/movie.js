const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
    res.send({
        status: req.params.id
    })
});

router.get("/search", (req, res) => {
    res.send({
        status: req.query.k
    })
});

module.exports = router;
