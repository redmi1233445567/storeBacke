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
        const { date, sells, status, desc, paided } = req.body;

        if (!sells || !Array.isArray(sells) || sells.length === 0) {
            return res.status(400).send("يجب إضافة منتجات داخل عملية البيع");
        }

        // ✅ حساب إجمالي السعر
        const allPrice = sells.reduce((acc, item) => acc + item.price , 0);

        // ✅ إنشاء طلب جديد
        const order = new Selles({
            date,
            status,
            desc,
            sells,
            allPrice,
            paided,
            or: paided - allPrice,
        });

        await order.save();

        // ✅ تحديث كمية المنتجات
        for (let item of sells) {
            let product = await Products.findById(item.proId);

            if (product) {
                let updatedQty = product.qty - item.qty;
                if (updatedQty < 0) updatedQty = 0;

                await Products.findByIdAndUpdate(
                    item.proId,
                    { qty: updatedQty },
                    { new: true }
                );
            }
        }

        res.status(200).send("✅ تم تسجيل عملية البيع بنجاح");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ خطأ في السيرفر");
    }
}



module.exports = {getAllSell, addSell}