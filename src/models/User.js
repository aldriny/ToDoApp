import mongoose , {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
},{timestamps: true});

userSchema.pre("save", async function(next){
    if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.statics.login = async function(email, password){
    const user = await User.findOne({email});
    if (!user) {
        throw Error("invalid email");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        throw Error("invalid password");
    }
    return user;
}

const User = mongoose.model("User", userSchema);

export default User;