import mongoose from "mongoose";

import CalendarSchema from "../schemas/Calendar.schema.js";

export default mongoose.model("Calendar", CalendarSchema);

