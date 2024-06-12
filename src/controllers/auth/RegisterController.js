import User from "../../models/User.js";
import Joi from "joi";
import { createToken, maxAgeInSeconds } from "../../utils/auth.js";

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(70).pattern(/^[a-zA-Z0-9\s]+$/).required().messages({
        'string.empty': `Name is required.`,
        'string.min': `Name should be at least {#limit} characters long.`,
        'string.max': `Name should be at most {#limit} characters long.`,
        'string.pattern.base': `Name should contain only letters and spaces.`,

    }),
    email: Joi.string().trim().email().required().messages({
        'string.empty': `Email is required.`,
        'string.email': `Email should be a valid email address.`,
    }),
    password: Joi.string().trim().min(8).max(255).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/).required().messages({
        'string.empty': `Password is required.`,
        'string.min': `Password should be at least {#limit} characters long.`,
        'string.max': `Password should be at most {#limit} characters long.`,
        'string.pattern.base': `Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character.`,
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
        'any.only': `Confirm password must match the password field.`,
        'any.required': `Confirm password is required.`,
    })
});

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
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAgeInSeconds * 1000});
        
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

