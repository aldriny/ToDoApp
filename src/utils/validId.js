import { Types } from "mongoose";

const validId = (ids) => {
    for (const id of ids) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }
    }
}

export default validId;