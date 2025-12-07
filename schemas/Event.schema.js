import { Schema } from "mongoose";

const EventSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    calendar: {
        type: Schema.Types.ObjectId,
        ref: "Calendar",
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
    start: {
        type: Schema.Types.Date,
        required: true,
    },
    rrule: {
        type: Schema.Types.String,
    },
    color: {
        type: Schema.Types.String,
        default: "#631826",
        trim: true,
    },
}, {
    versionKey: false,
    discriminatorKey : "type",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

// Instance methods

EventSchema.methods.toClient = function () {
    const client = this.toJSON();

    client.id = client._id;
    delete client._id;

    return client;
};

export default EventSchema;

