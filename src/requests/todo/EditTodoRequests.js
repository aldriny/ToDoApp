import Joi from "joi";

const editTodoSchema = Joi.object({
    title: Joi.string().trim().min(2).max(70).optional().messages({
        'string.min': `Title should be at least 2 characters long.`,
        'string.max': `Title should be at most 70 characters long.`,
    }),
    description: Joi.string().trim().optional(),
    completed: Joi.boolean().optional(),
    listId: Joi.string().trim().length(24).required().messages({
        'string.empty': 'List ID is required.',
        'string.length': 'List ID must be a valid 24-character ObjectId.'
    }),
    userId: Joi.string().trim().length(24).required().messages({
        'string.empty': `User ID is required.`,
        'any.required': 'User ID is a required field.',
        'string.length': 'List ID must be a valid 24-character ObjectId.'
    }),
    todoId: Joi.string().trim().length(24).required().messages({
        'string.empty': 'Todo ID is required.',
        'any.required': 'Todo ID is a required field.',
        'string.length': 'List ID must be a valid 24-character ObjectId.'
    })
});

export default editTodoSchema;