const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log("Checking User Authentication(checkauthjs)");
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decoded;
        console.log("User Authentication completed(checkauthjs)");
        next();
    } catch (error) {
        console.log("User Authentication Failed(checkauthjs)");
        next({
            message: 'Authorization Failed',
            status: 401
        });
    }
};