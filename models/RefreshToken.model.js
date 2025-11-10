import mongoose from "mongoose";

import RefreshTokenSchema from "../schemas/RefreshToken.schema.js";

export default mongoose.model("RefreshToken", RefreshTokenSchema);

