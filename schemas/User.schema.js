import { Schema } from "mongoose";

export default new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: "",
        trim: true,
    },
    avatar: {
        type: String,
        default: "",
        trim: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

