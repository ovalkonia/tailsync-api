import EventModel from "../models/Event.model.js";
import ArrangementModel from "../models/Arrangement.model.js";
import ReminderModel from "../models/Reminder.model.js";
import TaskModel from "../models/Task.model.js";

export default {
    get_events: async (req, res) => {
        const event_documents = (await EventModel.find({ owner: req.user.id })).map(event => event.toClient());

        return res.json({
            status: "success",
            message: "Successfully got all the events!",
            data: {
                events: event_documents,
            },
        });
    },
    post_event: async (req, res) => {
        let model;
        switch (req.body.type) {
            case "arrangement": model = ArrangementModel; break;
            case "reminder": model = ReminderModel; break;
            case "task": model = TaskModel; break;
        }

        delete req.body.type;
        await model.create({
            ...req.body,
            owner: req.user.id,
        });

        return res.json({
            status: "success",
            message: "Successfully posted the event!",
        });
    },
    patch_event: async (req, res) => {
        let model;
        switch (req.body.type) {
            case "arrangement": model = ArrangementModel; break;
            case "reminder": model = ReminderModel; break;
            case "task": model = TaskModel; break;
        }

        await model.findByIdAndUpdate(req.event.id, req.body);

        return res.json({
            status: "success",
            message: "Successfully patched the event!",
        });
    },
    delete_event: async (req, res) => {
        await EventModel.findByIdAndDelete(req.event.id);

        return res.json({
            status: "success",
            message: "Successfully deleted the event!",
        });
    },
};

