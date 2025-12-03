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
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.pre(["updateOne", "updateMany", "findOneAndUpdate"], async function (next) {
        const update = this.getUpdate();
        const password = update.password || update.$set?.password;
        if (!password) {
            return next();
        }

        try {
            const hashed = await bcrypt.hash(password, 12);
            if (update.password) {
                update.password = hashed;
            }

            if (update.$set?.password) {
                update.$set.password = hashed;
            }

            this.setUpdate(update);

            return next();
        } catch (error) {
            return next(error);
        }
    }
);

// Instance methods

UserSchema.methods.compare_password = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default UserSchema;

