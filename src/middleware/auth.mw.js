const jwt = require('jsonwebtoken');
const fs = require("fs");
const readSecretKey = () => fs.readFileSync(`jwt.secret.pk`, 'utf8')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, readSecretKey());
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.email;
  let role = decodedToken.role;
  if (role.toUpperCase() === 'ADMIN')
    req.isAdmin = true;
  else
    req.isAdmin = false;

  next();
};