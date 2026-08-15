const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/authController");

router.get("/", authController.getAuth);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/profile",verifyToken,getProfile);

module.exports = router;