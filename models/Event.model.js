import mongoose from "mongoose";

import EventSchema from "../schemas/Event.schema.js";

export default mongoose.model("Event", EventSchema);

