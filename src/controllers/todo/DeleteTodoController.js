import Todo from "../../models/Todo.js";
import List from "../../models/List.js";
import validId from "../../utils/validId.js";

const deleteTodo = async (req,res,next) => {
    try {
        const todoId = req.params.todoId;
        
        validId([todoId]);

        const findTodo = await Todo.findById(todoId);
        if (!findTodo) {
            return res.status(404).json({message: "Todo not found"});
        }
        
        const listId = findTodo.listId;
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({message: "List not found"});
        }
        list.todos.pop(todoId);
        await list.save();

        await Todo.findByIdAndDelete(todoId);
        return res.json({message: "Todo deleted successfully"});
        

    }
    catch (err) {
        next(err);
    }
}

export default deleteTodo;