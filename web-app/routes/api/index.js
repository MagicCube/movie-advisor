const express = require("express");
const router = express.Router();

router.use("/movie", require("./movie"));

module.exports = router;
