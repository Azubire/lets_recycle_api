const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/recyclers");
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

const {
  destroy,
  getRecyclers,
  create,
} = require("../../controllers/admin/RecyclersController");

router.get("/", getRecyclers);
router.post("/create", upload.single("recyclerImage"), create);
router.delete("/delete/:id", destroy);

module.exports = router;
