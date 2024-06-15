import List from "../../models/List.js";
import Todo from "../../models/Todo.js"; 
import validId from "../../utils/validId.js";

const deleteList = async (req, res, next) => {
    try {
        const listId = req.params.listId;

        validId([listId]);


        const findList = await List.findById(listId);
        if (!findList) {
            return res.status(404).json({message: "List not found"});
        }

        const todos = await Todo.find({listId: listId});
        if (!todos) {
            return res.status(404).json({message: "List doesn't have todos"});
        }

        todos.forEach(async (todo) => {
            await Todo.findByIdAndDelete(todo._id);
        })

        await List.findByIdAndDelete(listId);
        res.status(200).json({message: "List deleted successfully"});

    } catch (error) {
        next(error);
    }


}

export default deleteList;