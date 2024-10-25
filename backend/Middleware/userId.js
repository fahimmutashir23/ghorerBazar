const { v4: uuidv4 } = require('uuid');

const userId = ((req, res, next) => {
    if (!req.cookies.userId) {
      const userId = uuidv4();
      res.cookie('userId', userId, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
        sameSite: 'none', // Cross-site cookies
        secure: true, // Set to true if using HTTPS
      });
    } else {
      req.userId = req.cookies.userId;
    }
    next();
  });

module.exports = userId
