import mongoose from "mongoose";

import PasswordResetTokenSchema from "../schemas/PasswordResetToken.schema.js";

export default mongoose.model("PasswordResetToken", PasswordResetTokenSchema);

