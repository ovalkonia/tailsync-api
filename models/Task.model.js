import TaskSchema from "../schemas/Task.schema.js";
import EventModel from "./Event.model.js";

export default EventModel.discriminator("Task", TaskSchema);

