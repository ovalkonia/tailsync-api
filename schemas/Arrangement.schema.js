import { Schema } from "mongoose";

const ArrangementSchema = new Schema({
    end: {
        type: Schema.Types.Date,
        required: true,
    },
    location: {
        type: Schema.Types.Date,
        required: true,
    },
});

export default ArrangementSchema;

