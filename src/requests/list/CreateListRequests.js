import Joi from "joi";

const listSchema = Joi.object({
    title: Joi.string().trim().min(2).max(70).required().messages({
        'string.empty': `Title is required.`,
        'string.min': `Title should be at least {#limit} characters long.`,
        'string.max': `Title should be at most {#limit} characters long.`,
        'any.required': 'Title is a required field.'
    }),
    description: Joi.string().trim().required().messages({
        'string.empty': `Description is required.`,
        'any.required': 'Description is a required field.'
    }),
    userId: Joi.string().trim().required().messages({
        'string.empty': `User ID is required.`,
        'any.required': 'User ID is a required field.'
    }),
});

export default listSchema;