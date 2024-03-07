const express = require("express");
const placesControllers = require("../controllers/places-controllers");
const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

// todo : watch video
router.patch("/:pid" , placesControllers.updatePlace)

// todo : watch video
router.delete("/:pid" , placesControllers.deletePlaceById)

router.get("/user/:uid", placesControllers.getPlaceByUserId);

router.post("/" , placesControllers.createPlace)

module.exports = router;
