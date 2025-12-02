import bcrypt from "bcrypt";
import { Schema } from "mongoose";

const UserSchema = new Schema({
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
        default: "/uploads/avatars/default-avatar.jpg",
        trim: true,
    },
    role: {
        type: Schema.Types.String,
        default: "user",
        enum: ["user", "admin"],
    },
    verified: {
        type: Schema.Types.Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

// Middlwares

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

// Instance methods

UserSchema.methods.compare_password = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default UserSchema;

