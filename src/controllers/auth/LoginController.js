import User from "../../models/User.js";
import Token from "../../models/Token.js";
import LoginSchema from "../../requests/auth/loginRequests.js";
import { createToken} from "../../utils/auth.js";

const login = async (req, res, next) => {
    try{
        const {error} = LoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        const { email, password } = req.body;
        
        const user = await User.login(email, password);
        const token = createToken(user._id);
        const tokenRecord = new Token({token,userId: user._id});
        await tokenRecord.save();


        // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAgeInSeconds * 1000});

        res.status(200).json({
            "msg": "Login successful",
            "user id": user._id,
            "token": token
        });

    } catch (err) {
        next(err);
    }
};

export default login;