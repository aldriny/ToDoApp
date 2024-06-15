import Joi from "joi";

const todoSchema = Joi.object({
    title: Joi.string().trim().min(2).max(70).required().messages({
        'string.empty': `Title is required.`,
        'string.min': `Title should be at least 2 characters long.`,
        'string.max': `Title should be at most 70 characters long.`,
    }),
    description: Joi.string().trim().required().messages({
        'string.empty': `Description is required.`,
        'any.required': 'Description is a required field.'
    }),
    completed: Joi.boolean().optional(),
    listId: Joi.string().trim().length(24).required().messages({
        'string.empty': 'List ID is required.',
        'string.length': 'List ID must be a valid 24-character ObjectId.'
    }),
    userId: Joi.string().trim().required().messages({
        'string.empty': `User ID is required.`,
        'any.required': 'User ID is a required field.'
    })
});

export default todoSchema;