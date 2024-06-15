import list from "../../models/List.js";
import Todo from "../../models/Todo.js";
import todoSchema from "../../requests/todo/CreateTodoRequests.js";
import validId from "../../utils/validId.js";

const CreateTodo = async (req, res, next) => {
    try {
        const {listId} = req.params;
        const userId = req.user.id;
        console.log(userId);
        const {title,description,completed} = req.body;
    
        const {error} = todoSchema.validate({...req.body, listId,userId});
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        validId([listId,userId]);

        const findList = await list.findById(listId); 
        if(!findList){
            return res.status(404).json({message: "List not found"});
        }else{
            let todo = new Todo({
                title,
                description,
                completed,
                listId,
                userId,
            })
            await todo.save();

            findList.todos.push(todo._id);
            await findList.save();

            res.status(201).json({
                messsage: "Todo created successfully",
                Todo: todo
            });         
        }

    } catch (error) {
        next(error);
    }
}

export default CreateTodo;