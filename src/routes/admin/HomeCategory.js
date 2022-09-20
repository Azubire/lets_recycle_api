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

const {
  HomeCategoryController,
} = require("../../controllers/admin/HomeCategoryController");
const {
  RecyclingCategoryController,
} = require("../../controllers/admin/RecyclingCategory");

router.get("/", HomeCategoryController.getAllHomeCategories);
router.post(
  "/category/create",
  upload.single("avatar"),
  HomeCategoryController.createHomeCategory
);
router.get("/category/edit/:id", HomeCategoryController.getHomeCategory);
router.put("/category/update/:id", HomeCategoryController.updateHomeCategory);
router.delete(
  "/category/delete/:id",
  HomeCategoryController.deleteHomeCategory
);

//recycling routes
router.get("/recycling", RecyclingCategoryController.getAllRecyclingCategory);
router.post(
  "/recycling/category/create",
  upload.single("icon"),
  RecyclingCategoryController.createRecyclingCategory
);
router.delete(
  "/recycling/category/delete/:id",
  RecyclingCategoryController.deleteRecyclingCategory
);
router.get("/adverts", HomeCategoryController.getAdverts);

module.exports = router;
