import { Schema } from "mongoose";

export default new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    issued_at: {
        type: Schema.Types.Date,
        required: true,
    },
    sliding_exp: {
        type: Schema.Types.Date,
        required: true,
    },
    absolute_exp: {
        type: Schema.Types.Date,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

