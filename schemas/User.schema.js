import { Schema } from "mongoose";

export default new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        index: true,
        unique: true,
        trim: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        default: "",
        trim: true,
    },
    avatar: {
        type: Schema.Types.String,
        default: "",
        trim: true,
    },
    role: {
        type: Schema.Types.String,
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

