import Joi from "joi";

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

export default registerSchema;