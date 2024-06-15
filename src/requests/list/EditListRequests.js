import Joi from "joi";

const editListSchema = Joi.object({
    title: Joi.string().trim().min(2).max(70).optional().messages({
        'string.min': `Title should be at least 2 characters long.`,
        'string.max': `Title should be at most 70 characters long.`,
    }),
    description: Joi.string().trim().optional(),
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