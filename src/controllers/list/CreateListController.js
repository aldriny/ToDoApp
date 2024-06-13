import List from '../../models/List.js';
import listSchema from '../../requests/list/CreateListRequests.js';

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