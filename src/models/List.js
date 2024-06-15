import mongoose , {Schema} from "mongoose";

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
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Todo"
        }
    ],
}, {timestamps: true});

const list = mongoose.model('List',listSchema);

export default list;