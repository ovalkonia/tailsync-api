import UserError from "../errors/User.error.js";
import UserModel from "../models/User.model.js";

export default {
    patch_password_change: async (req, res) => {
        const { old_password, new_password } = req.body;

        if (req.user.password !== old_password) {
            throw UserError.INCORRECT_PASSWORD();
        }

        await UserModel.findByIdAndUpdate(req.user._id, { password: new_password });

        return res.json({
            status: "success",
            message: "Password updated successfully"
        });
    },

    patch_name_change: async (req, res) => {
        const { name } = req.body;

        await UserModel.findByIdAndUpdate(req.user._id, { name });

        return res.json({
            status: "success",
            message: "Name updated successfully",
            data: {
                name
            }
        });
    }
}