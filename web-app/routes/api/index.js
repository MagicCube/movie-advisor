const express = require("express");
const router = express.Router();

router.use("/subject", require("./subject"));

module.exports = router;
