import { Schema } from "mongoose";

const ArrangementSchema = new Schema({
    end: {
        type: Schema.Types.Date,
        required: true,
    },
    location: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
});

export default ArrangementSchema;

