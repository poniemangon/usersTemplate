function setUser(req, res, next) {
    res.locals.user = req.session.userLogged || null;
    next();
  }

module.exports = setUser;