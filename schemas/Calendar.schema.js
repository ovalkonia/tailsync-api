import { Schema } from "mongoose";

const CalendarSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    description: {
        type: Schema.Types.String,
        default: "",
        trim: true,
    },
    color: {
        type: Schema.Types.String,
        default: "#186325",
        trim: true,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

export default CalendarSchema;

