import Todo from "../../models/Todo.js";
import validId from "../../utils/validId.js";

const deleteTodo = async (req,res,next) => {
    try {
        const todoId = req.params.todoId;
        
        validId([todoId]);

        const deleteTodo = await Todo.findByIdAndDelete(todoId);
        if (!deleteTodo) {
            return res.status(404).json({message: "Todo not found"});
        }
        return res.json({message: "Todo deleted successfully"});
        

    }
    catch (err) {
        next(err);
    }
}

export default deleteTodo;