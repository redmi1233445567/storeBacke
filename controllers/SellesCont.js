const Selles = require("../models/SellesModel");
const Products = require("../models/ProductsModel")

let getAllSell = async (req, res) => {
    try {
        let sell = await Selles.find({});

        if (sell.length === 0) {
            res.status(400).send("no products found..");
        } else {
            res.status(200).send(sell)
        }
    } catch (err) {
        for (let i in err.errors) {
            console.log(err.errors[i].message);
            res.status(400).send("Bad requst...")
        }
    }
};

let addSell = async (req, res) => {
    try {
        // إنشاء عملية بيع جديدة
        let sell = new Selles({
            name: req.body.name,
            desc: req.body.desc,
            qty: req.body.qty,
            price: req.body.price,
            or: req.body.or,
            date: req.body.date,
            status: req.body.status,
            proId: req.body.proId
        });

        await sell.save();

        // تحديث كمية المنتج
        let product = await Products.findById(req.body.proId);

        if (!product) {
            return res.status(404).send("المنتج غير موجود");
        }

        // طرح الكمية
        let newQty = product.qty - req.body.qty;
        if (newQty < 0) newQty = 0; // تأكد إن الكمية مش بالسالب

        await Products.findByIdAndUpdate(
            req.body.proId,
            { $set: { qty: newQty } },
            { new: true }
        );

        res.status(200).send("تم اضافة عملية");
    } catch (err) {
        console.error(err);
        res.status(400).send("Bad request...");
    }
}



module.exports = {getAllSell, addSell}