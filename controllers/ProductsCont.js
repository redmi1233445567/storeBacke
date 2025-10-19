const Products = require("../models/ProductsModel");

let getAllProducte = async (req, res) => {
    try {
        let pro = await Products.find({});

        if (pro.length === 0) {
            res.send("no products found..");
        } else {
            res.status(200).send(pro)
        }
    } catch (err) {
        for (let i in err.errors) {
            console.log(err.errors[i].message);
            res.status(400).send("Bad requst...")
        }
    }
};

let addProduct = (req, res) => {
    let pro = new Products({ name: req.body.name, desc: req.body.desc, category: req.body.category, qty: req.body.qty, price: req.body.price, priceA: req.body.priceA, date: req.body.date });

    pro.save().then(() => {
        res.status(200).send("تم اضافة منتج")
    }).catch((err) => {
        for (let i in err.errors) {
            console.log(err.errors[i].message);
            res.status(400).send("Bad requst...")
        }
    })
}

let editeProduct = async (req, res) => {
    try {
        let pro = await Products.findOneAndUpdate({_id:req.params.id}, req.body, {new: true});

        if (!pro) {
            return res.status(400).send("no products found..");
        } else {
            res.status(200).send(pro)
        }
    }catch (err) {
        for (let i in err.errors) {
            console.log(err.errors[i].message);
            res.status(400).send("Bad requst...")
        }
    }
}

let deleteProduct = async (req, res) => {
    try {
        let pro = await Products.findByIdAndDelete(req.params.id);

        if (!pro) {
            return res.status(400).send("no products found..");
        } else {
            res.status(200).send(pro)
        }
    }catch (err) {
        for (let i in err.errors) {
            console.log(err.errors[i].message);
            res.status(400).send("Bad requst...")
        }
    }
};


module.exports = {getAllProducte, addProduct, editeProduct, deleteProduct}