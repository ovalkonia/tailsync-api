import mongoose from "mongoose";
import bcrypt from "bcrypt";

import UserSchema from "../schemas/User.schema.js";

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.compare_password = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", UserSchema);

