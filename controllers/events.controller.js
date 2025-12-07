import Rrule from "rrule";

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

        let end = req.body.end;
        if (!end) {
            end = new Date(req.body.start);
            end.setDate(end.getDate() + 1);
            end.setHours(0, 0, 0, 0);
            end.setTime(end.getTime() - 1);
        }

        let rrule;
        if (req.body.rrule) {
            let freq;
            switch (req.body.rrule) {
                case "yearly": freq = Rrule.RRule.YEARLY; break;
                case "monthly": freq = Rrule.RRule.MONTHLY; break;
                case "weekly": freq = Rrule.RRule.WEEKLY; break;
                case "daily": freq = Rrule.RRule.DAILY; break;
            }

            rrule = new Rrule.RRule({
                freq,
                dtstart: new Date(req.body.start),
            }).toString();
        }

        delete req.body.type;
        await model.create({
            ...req.body,
            owner: req.user.id,
            rrule,
            end,
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

        let rrule;
        if (req.event.rrule || req.body.rrule) {
            let freq;
            if (req.body.rrule) {
                switch (req.body.rrule) {
                    case "yearly": freq = Rrule.RRule.YEARLY; break;
                    case "monthly": freq = Rrule.RRule.MONTHLY; break;
                    case "weekly": freq = Rrule.RRule.WEEKLY; break;
                    case "daily": freq = Rrule.RRule.DAILY; break;
                }
            } else {
                const temp = Rrule.RRule.parseString(req.event.rrule);
                freq = temp.freq;
            }

            let dtstart;
            if (req.body.start) {
                dtstart = new Date(req.body.start);
            } else {
                dtstart = new Date(req.event.start);
            }

            rrule = new Rrule.RRule({
                freq,
                dtstart,
            }).toString();
        }

        req.body.rrule = rrule;

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

