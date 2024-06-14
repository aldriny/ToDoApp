import Joi from "joi";

const editListSchema = Joi.object({
    title: Joi.string().trim().min(2).max(70).optional().messages({
        'string.min': `Title should be at least {#limit} characters long.`,
        'string.max': `Title should be at most {#limit} characters long.`,
    }),
    description: Joi.string().trim().optional().messages({
        'string.empty': 'Description is a required field.'
    }),
    userId: Joi.string().trim().required().messages({
        'string.empty': `User ID is required.`,
        'any.required': 'User ID is a required field.'
    }),
     listId: Joi.string().trim().required().messages({
        'string.empty': 'List ID is required.',
        'any.required': 'List ID is a required field.'
    })
});

export default editListSchema;