const mongoose = require("mongoose");

const sellesSchema = new mongoose.Schema({
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
    qty: {
        type: Number,
        required:true,
        min: 1
    },
    price: {
        type: Number,
        required:true,
    },
    or: {
        type: Number,
        required:true,
    },
    status: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true,
    },
    proId: {
        type: String,
        required: true
    }
});

const Selles = mongoose.model("sell", sellesSchema);

module.exports = Selles;