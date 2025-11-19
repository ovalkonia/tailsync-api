import UserError from "../errors/User.error.js";

export default {
    patch_password_change: async (req, res) => {
        const { old_password, new_password } = req.body;
        const user = req.user;

        if (user.password !== old_password) {
            throw UserError.INCORRECT_PASSWORD();
        }

        user.password = new_password;
        await user.save();

        return res.json({
            status: "success",
            message: "Password updated successfully"
        });
    },

    patch_name_change: async (req, res) => {
        const { name } = req.body;
        const user = req.user;

        user.name = name;
        await user.save();

        return res.json({
            status: "success",
            message: "Name updated successfully",
            data: {
                name: user.name
            }
        });
    }
}