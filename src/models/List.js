import mongoose , {Schema} from "mongoose";
import todoSchema from "./Todo.js";



const listSchema = new Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    todos: [todoSchema.schema],
}, {timestamps: true});

const list = mongoose.model('List',listSchema);

export default list;