const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minlength: [6, "minmum password length is 6 characters"]
    },
});

//hash password befor save doc
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

// login function
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email} );
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email")
};

const User = mongoose.model("users", userSchema);

module.exports = User;