import List from "../../models/List.js";
import { Types } from "mongoose";

const deleteList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        if (!Types.ObjectId.isValid(listId)) {
            return res.status(400).json({ message: "Invalid list ID format" });
          }  

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