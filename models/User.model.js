import mongoose from "mongoose";

import UserSchema from "../schemas/User.schema.js";

export default mongoose.model("User", UserSchema);

