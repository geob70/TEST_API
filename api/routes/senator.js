const express = require("express");
const router = express.Router();
const senatorController = require("../contollers/Senator");

router.post("/add_senator", senatorController.add_senator);
router.post("/upload", senatorController.upload_image);
router.get("/fetch_all", senatorController.get_all_senator);
router.post("/delete", senatorController.delete_senator);
router.post("/update_name", senatorController.update_senator_name);
router.post("/update_image", senatorController.update_senator_image);

module.exports = router;
