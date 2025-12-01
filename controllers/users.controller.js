import UserModel from "../models/User.model.js";

export default {
    get_users: async (req, res) => {
        const users = await UserModel.find({});

        return res.json({
            status: "success",
            message: "Successfully got all the users!",
            data: {
                users,
            },
        });
    },
    get_user: async (req, res) => {
        const user = await UserModel.findById(req.params.id);

        return res.json({
            status: "success",
            message: "Successfully got the user!",
            data: {
                user,
            },
        });
    },
    patch_user: async (req, res) => {
        const result = await UserModel.findByIdAndUpdate(req.user._id, req.body);

        return res.json({
            status: "success",
            message: "Successfully pathched the user!",
            data: {
                changes: req.body,
            },
        });
    },
    delete_user: async (req, res) => {
        await UserModel.findByIdAndDelete(req.user._id);

        return res.json({
            status: "success",
            message: "Successfully deleted the user!",
        });
    },
};

