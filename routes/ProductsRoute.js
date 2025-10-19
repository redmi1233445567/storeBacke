const express = require("express");
const router = express.Router();
const producteCont = require("../controllers/ProductsCont")

router.get("/", producteCont.getAllProducte);

router.post("/", producteCont.addProduct);

router.put("/:id", producteCont.editeProduct);

router.delete("/:id", producteCont.deleteProduct);

module.exports = router;