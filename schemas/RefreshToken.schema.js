import { Schema } from "mongoose";

export default new Schema({
    jti: {
        type: Schema.Types.String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
    _id: false,
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

