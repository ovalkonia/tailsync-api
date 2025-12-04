import ReminderSchema from "../schemas/Reminder.schema.js";
import EventModel from "./Event.model.js";

export default EventModel.discriminator("Reminder", ReminderSchema);

