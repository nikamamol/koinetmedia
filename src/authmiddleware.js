const jwt = require('jsonwebtoken');
const secretKey = "pLud5OFaXkEa-8FrVYVnB3aZimVULT10fJapm-5vlKPnihgVUkJ3TFK_QqREbCkw"; // Replace with your actual secret key

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming token is stored in a cookie named 'token'

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // If token is valid, save decoded user information to request object for future use
        req.user = decoded;
        next(); // Continue to the next middleware or route handler
    });
};
module.exports = verifyToken;