const express = require("express");
const router = express.Router();
const SellesCont = require("../controllers/SellesCont")

router.get("/", SellesCont.getAllSell);

router.post("/", SellesCont.addSell);

module.exports = router;