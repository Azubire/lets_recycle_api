const express = require("express");

const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

// routes
router.get("/home/categories", HomeController.getHomeCategories);
router.get("/user/:id", UserController.getUser);
router.get("/dashboard", UserController.getMetrics);

module.exports = router;
