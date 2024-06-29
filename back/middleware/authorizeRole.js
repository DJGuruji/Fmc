// middleware/authorize.js

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied, you do not have the required role.' });
        }
        next();
    };
};

module.exports = authorizeRoles;
