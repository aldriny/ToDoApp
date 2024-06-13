import User from "../../models/User.js";
import Token from "../../models/Token.js";
import registerSchema from "../../requests/auth/RegisterRequests.js";
import { createToken} from "../../utils/auth.js";


const register = async (req, res, next) => {
    try {
        const {error} = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        const {name, email, password} = req.body;

        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "email already used"});
        }

    
        user = new User({name, email, password});
        await user.save();
        const token = createToken(user._id);
        const tokenRecord = new Token({token,userId: user._id});
        await tokenRecord.save();

        // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAgeInSeconds * 1000});
        
        res.status(201).json({
            "msg": "User created successfully",
            "user id": user._id,
            "token": token
        });
        
    } catch (err) {
        next(err);
    }



}

export default register;

