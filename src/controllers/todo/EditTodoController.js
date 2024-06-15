import Todo from "../../models/Todo.js";
import editTodoSchema from "../../requests/todo/EditTodoRequests.js";
import validId from "../../utils/validId.js";

const editTodo = async (req, res, next) => {
    try {
        const {listId} = req.params;
        const todoId = req.query._id;
        const userId = req.user.id;
        const {title,description,completed} = req.body;

        const {error} = editTodoSchema.validate({...req.body, listId, userId, todoId});
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        
        validId([listId, userId, todoId]);

        const updatedTodo = await Todo.findOneAndUpdate(
            {userId: userId, listId: listId, _id: todoId},
            {title,description,completed},
            {new: true}
        )
        if (!updatedTodo){
            return res.status(404).json({message: "Todo not found"});
        }
        res.status(200).json({
            message : "Todo updated successfully",
            Todo: updatedTodo
        });
    } catch (error) {
        next(error);
    }
}
export default editTodo;