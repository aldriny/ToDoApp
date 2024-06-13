import mongoose , {Schema} from "mongoose";

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 2 * 7 * 24 * 60 * 60, // 2 weeks
    },
    isRevoked: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

tokenSchema.methods.isExpired = function() {
    return Date.now() > this.createdAt.getTime() + 14 * 24 * 60 * 60 * 1000;
};

tokenSchema.methods.revoke = function() {
    this.isRevoked = true;
    this.save();
};


const token = mongoose.model('Token',tokenSchema);

export default token;