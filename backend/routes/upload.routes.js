const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");
const { uploadAvatar } = require("../controller/upload.controller");

router.post("/avatar", upload.single("image"), uploadAvatar);

module.exports = router;
