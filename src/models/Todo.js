import mongoose , {Schema} from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const todo = mongoose.model('Todo',todoSchema);

export default todo;