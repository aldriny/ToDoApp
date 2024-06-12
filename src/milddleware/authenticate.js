import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Access denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    } catch (error) {
        next(error);
    }
};

export default authenticate;
