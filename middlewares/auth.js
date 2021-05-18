const { userInfo } = require('os');
const { nextTick } = require('process');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const config = require('config');

const asyncVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
  const { headers: { authorization } } = req;
  
  if (!authorization) {
    next((new Error('UN_AUTHENTICATED')));
  }

  // user auth
  try {
    const { id } = await asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
    const user = await User.findById(id).exec();
    req.user = user;
    next();
  } catch (e) {
    next((new Error('UN_AUTHENTICATED')));
  }

  // admin auth
  try {
    const { id } = await  asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
    const admin = await Admin.findById((id)).exec();
    req.admin = admin;
    next();
  } catch (e){
    next((new Error('UN_AUTHENTICATED')));
  }


  // products auth
  //Get token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'no Token,authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'no token,authorization denied' });
  }

};


module.exports = auth;
