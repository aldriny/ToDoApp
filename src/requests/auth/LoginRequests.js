import Joi from "joi";

const LoginSchema = Joi.object({
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
});

export default LoginSchema;