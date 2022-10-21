const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.USERSECRET);
    req.user=decodedToken;
      next();
      return
    
  } catch (err){
    return res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};