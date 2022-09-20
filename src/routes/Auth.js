const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/AuthController");
const Middleware = require("../middlewares/verifyToken");

//users
router.post("/signup", AuthController.userSignup);
router.post("/signin", AuthController.userSignin);
router.post("/verifytoken", AuthController.verifyTokenFromAsyncStorage);
//recycler
// router.post("/recycler/signup", AuthController.recyclerSignup);

//admin
router.post("/admin/signup", AuthController.adminSignup);
router.post("/admin/signin", AuthController.adminSignin);

module.exports = router;
