const express = require("express");

const router = express.Router();
const {
  getNotifications,
  getUserNotifications,
  destroy,
  create,
  update,
} = require("../controllers/NotificationsController");

router.get("/", getNotifications);
router.get("/:id", getUserNotifications);
router.post("/create/:id", create);
router.put("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
