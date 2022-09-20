const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/categoryImages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/", UserController.getUsers);
// router.post("")

router.get("/ad/:id", UserController.getUser);

router.post("/", UserController.createUser);

router.put(
  "/update/:id",
  upload.single("profileImage"),
  UserController.updateUser
);

router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
