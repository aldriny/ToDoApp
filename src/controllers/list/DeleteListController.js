import List from "../../models/List.js";
import validId from "../../utils/validId.js";

const deleteList = async (req, res, next) => {
    try {
        const listId = req.params.listId;

        validId([listId]);

        const deleteList = await List.findByIdAndDelete(listId);
        
        if(!deleteList) {
            return res.status(404).json({message: "List not found"});
        }
        res.status(200).json({message: "List deleted successfully"});
    } catch (error) {
        next(error);
    }


}

export default deleteList;