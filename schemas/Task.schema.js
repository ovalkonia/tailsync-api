import { Schema } from "mongoose";

const TaskSchema = new Schema({
    completed: {
        type: Schema.Types.Boolean,
        default: false,
    },
});

export default TaskSchema;

