import CalendarError from "../errors/Calendar.error.js";
import CalendarModel from "../models/Calendar.model.js";

export default () => {
    return async (req, res, next) => {
        const calendar_id = req.params.calendar_id;
        const calendar_document = await CalendarModel.findById(calendar_id);
        if (!calendar_document) {
            throw CalendarError.DOESNT_EXIST();
        }

        req.calendar = calendar_document.toClient();

        return next();
    };
};

