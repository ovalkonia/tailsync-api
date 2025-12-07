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
        default: "#1c71d8",
        trim: true,
    },
    type: {
        type: Schema.Types.String,
        enum: ["main", "custom"],
        default: "custom",
    },
    members: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            _id: false,
        }],
        default: [],
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

// Instance methods

CalendarSchema.methods.toClient = function () {
    const client = this.toJSON();

    client.id = client._id;
    delete client._id;

    return client;
};

export default CalendarSchema;

