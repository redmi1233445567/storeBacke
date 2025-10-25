const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = (req, res, next) => {
  const token = req.cookies?.authUser;
  console.log(req.cookies)

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'create by ahmed', (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(400).send('lllllسجل دخول');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).send(req.cookies);
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ahmed secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };