import Token from "../../models/Token.js";

const logout = async (req,res,next) =>{
    try {
        const token = req.token;
        const tokenRecord = await Token.findOne({token: token});
        if(!tokenRecord){
            return res.status(400).json({message: "Invalid token"});
        }
        tokenRecord.isRevoked = true;
        await tokenRecord.save();
        res.json({
            message: "Logged out successfully",
        })
    } catch (error) {
        next(error);
    }
}

export default logout;