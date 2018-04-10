const express = require('express');
const compose = require('composable-middleware');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../api/user/user.model');

const secret = {
  session: 'super-secret'
};

const userRoles = ['guest', 'user', 'admin'];

const validateJwt = expressJwt({
  secret: secret.session
});

exports.signToken = (id, role) => {
  return jwt.sign({
    _id: id,
    role: role
  }, secret.session, {
    expiresIn: 60 * 60 * 5
  });
}

exports.isAuthenticated = () => {
  return compose()
    .use((req, res, next) => {
      validateJwt(req, res, next);
    })
    .use(async (err, req, res, next) => {
      try {
        if (err.name === 'UnauthorizedError') {
          res.status(401).json({
            message:'No authorization token was found'
          });
        } else {
          const user = await User.findById(req.user._id);
          if(!user) {
            return res.status(401).json({
              message: 'Cannot find the user'
            });
          }
          req.user = user;
          next();
        }
      } catch(err) {
        next(err);
      }
    });
}

exports.hasRole = (roleRequired) => {
  if(!roleRequired) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(this.isAuthenticated())
    .use((req, res, next) => {
      if(userRoles.indexOf(req.user.role) >= userRoles.indexOf(roleRequired)) {
        return next();
      } else {
        return res.status(403).json({
          message: "Access Denied/Forbidden"
        });
      }
    });
}
