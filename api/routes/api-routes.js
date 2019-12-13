const express = require("express");
const fhemlogController = require("../controllers/fhemlog-controller");

const router = express.Router();

router.get("/:device/:reading", fhemlogController.getValues);
router.get("/:device/", fhemlogController.getReadings);
router.get("/", fhemlogController.getDevices);
module.exports = router;
