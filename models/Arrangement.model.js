import ArrangementSchema from "../schemas/Arrangement.schema.js";
import EventModel from "./Event.model.js";

export default EventModel.discriminator("Arrangement", ArrangementSchema);

