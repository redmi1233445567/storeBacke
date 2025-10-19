const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:2,
        trim: true
    },
    desc: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required:true,
        minlength:2,
        trim: true
    },
    qty: {
        type: Number,
        required:true,
        min: 1
    },
    price: {
        type: Number,
        required:true,
        min: 1
    },
    priceA: {
        type: Number,
        required:true,
        min: 1
    },
    date: {
        type: String,
        required:true,
    }
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;