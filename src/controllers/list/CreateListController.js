import List from '../../models/List.js';
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

const createList = async (req, res, next) => {
    try {
        const userId = req.user.id;        
        const {error} = listSchema.validate({...req.body,userId});
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        const {title,description} = req.body;

        let list = new List({
            title,
            description,
            userId,
            todos: []
        });
        await list.save();

        res.status(201).json({
            "msg": "List created successfully",
            List: list
        });

    } catch (err) {
        next(err);
    }
};

export default createList;