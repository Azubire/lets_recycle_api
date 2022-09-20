const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/ads");
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
  getAdverts,
  show,
  update,
  destroy,
  create,
} = require("../controllers/AdvertController");

router.get("/", getAdverts);
router.post("/create", upload.single("adImage"), create);
router.get("/show", show);
router.post("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
