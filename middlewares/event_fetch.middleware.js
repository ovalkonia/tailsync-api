import EventError from "../errors/Event.error.js";
import EventModel from "../models/Event.model.js";

export default () => {
    return async (req, res, next) => {
        const event_id = req.params.event_id;
        const event_document = await EventModel.findById(event_id);
        if (!event_document) {
            throw EventError.DOESNT_EXIST();
        }

        req.event = event_document.toClient();

        return next();
    };
};

