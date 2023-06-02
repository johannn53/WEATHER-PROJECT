const router = require("express").Router();
const weatherController = require("../controllers/weatherController");

router.post("/api/v1/weather", weatherController.getWeather);

module.exports = router;
