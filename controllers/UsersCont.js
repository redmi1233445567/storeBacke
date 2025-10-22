const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");


const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered"
  };

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect"
  }

  // duplicted error code
  if (err.code === 11000) {
    errors.email = "that email is already rigistered";
    return errors;
  }

  console.log(err.message.includes("users validation failed"))
  //validation errors
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  };
  console.log(errors)
  return errors;
};

//create token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "create by ahmed", {
    expiresIn: maxAge
  })
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("authUser", token, {
      httpOnly: true, maxAge: maxAge * 1000, secure: true,
      sameSite: "none"
    })
    res.status(200).json({ user: user._id, token: token })
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors })
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("authUser", token, {
      httpOnly: true, maxAge: maxAge * 1000, secure: true,
      sameSite: "none"
    })
    res.status(200).json({ user: user._id, token: token })

  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors })
  }
};