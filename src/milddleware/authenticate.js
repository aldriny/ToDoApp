import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import User from '../models/User.js';

const authenticate = async (req, res, next) => {

    try{
    // const token = req.cookies.jwt;
    const token = req.header('Authorization').replace('Bearer ','');
    const tokenRecord = await Token.findOne({token: token});

    if (!tokenRecord || tokenRecord.isRevoked) {
        return res.status(401).json({ message: 'Unauthorized'});
    }
    if (tokenRecord.isExpired()) {
        return res.status(401).json({ message: "Token expired" });
    }

    jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err || !decodedToken) {
            return res.status(401).json({ message: 'Unauthorized'});
        }

        const user = await User.findById(decodedToken.id);
        if (!user) {
            console.log(decodedToken.userId);

            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user; 
        req.token = token;
        next();
    })
    } catch (error) {
        next(error);
    }
};

export default authenticate;
