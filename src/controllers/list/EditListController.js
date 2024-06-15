import List from '../../models/List.js';
import editListSchema from '../../requests/list/EditListRequests.js';
import validId from '../../utils/validId.js';

const editList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const userId = req.user.id;
        const {title,description} = req.body;

        const {error} = editListSchema.validate({...req.body,userId,listId});
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        validId([listId,userId]);

        const updatedList = await List.findOneAndUpdate(
            {_id: listId, userId: userId},
            {$set : {title: title , description: description}},
            {new : true}
        )

        if(!updatedList){
            return res.status(404).json({message: "List not found"});
        }
        res.status(200).json({
            message : "list updated successfully",
            list : updatedList
        });
    }
    catch (err) {
        next(err);
    }
}

export default editList;

