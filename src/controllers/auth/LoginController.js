import User from "../../models/User.js";
import { createToken, maxAgeInSeconds } from "../../utils/auth.js";

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAgeInSeconds * 1000});

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