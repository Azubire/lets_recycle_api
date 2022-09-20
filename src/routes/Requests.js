const express = require("express");
const { getRequests } = require("../controllers/RequestsController");

const router = express.Router();

router.get("/", getRequests);

module.exports = router;
