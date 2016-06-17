const express = require("express");
const router = express.Router();

router.use("/api", require("./api"));

router.get("/", (req, res) => {
    res.redirect("/subject");
});

router.use("/subject", require("./subject"));

module.exports = router;
