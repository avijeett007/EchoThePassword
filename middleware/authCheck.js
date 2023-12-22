const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You must be logged in to perform this action');
  } else {
    next();
  }
};

module.exports = authCheck;
