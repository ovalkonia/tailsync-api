import Rrule from "rrule";

import ApiError from "../errors/Api.error.js";
import CalendarError from "../errors/Calendar.error.js";
import ArrangementModel from "../models/Arrangement.model.js";
import CalendarModel from "../models/Calendar.model.js";
import EventModel from "../models/Event.model.js";
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
        const calendar_id = req.body.calendar;
        const calendar_document = await CalendarModel.findById(calendar_id);
        if (!calendar_document) {
            throw CalendarError.DOESNT_EXIST();
        }

        req.calendar = calendar_document.toClient();

        const member = req.calendar.members.find(member => member.user.equals(req.user.id));
        if (!req.calendar.owner.equals(req.user.id) &&
            member?.role !== "contributor") {
            throw ApiError.FORBIDDEN();
        }

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
        const t_calendar_id = req.event.calendar;
        const t_calendar_document = await CalendarModel.findById(t_calendar_id);
        if (!t_calendar_document) {
            throw CalendarError.DOESNT_EXIST();
        }

        req.calendar = t_calendar_document.toClient();
        const t_member = req.calendar.members.find(member => member.user.equals(req.user.id));
        console.log(t_member);
        if (!req.calendar.owner.equals(req.user.id) &&
            t_member?.role !== "contributor") {
            throw ApiError.FORBIDDEN();
        }

        const calendar_id = req.event.calendar;
        const calendar_document = await CalendarModel.findById(calendar_id);
        if (!calendar_document) {
            throw CalendarError.DOESNT_EXIST();
        }

        req.calendar = calendar_document.toClient();
        const member = req.calendar.members.find(member => member.user.equals(req.user.id));
        if (!req.calendar.owner.equals(req.user.id) &&
            !req.event.owner.equals(req.user.id)) {
            throw ApiError.FORBIDDEN();
        }

        let model;
        switch (req.body.type) {
            case "arrangement": model = ArrangementModel; break;
            case "reminder": model = ReminderModel; break;
            case "task": model = TaskModel; break;
        }

        let rrule;
        if (req.event.rrule || ["yearly", "monthly", "weekly", "daily"].includes(req.body.rrule)) {
            let freq;
            if (["yearly", "monthly", "weekly", "daily"].includes(req.body.rrule)) {
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
        const calendar_id = req.event.calendar;
        const calendar_document = await CalendarModel.findById(calendar_id);
        if (!calendar_document) {
            throw CalendarError.DOESNT_EXIST();
        }

        req.calendar = calendar_document.toClient();

        const member = req.calendar.members.find(member => member.user.equals(req.user.id));
        if (!req.calendar.owner.equals(req.user.id) &&
            !req.event.owner.equals(req.user.id)) {
            throw ApiError.FORBIDDEN();
        }

        await EventModel.findByIdAndDelete(req.event.id);

        return res.json({
            status: "success",
            message: "Successfully deleted the event!",
        });
    },
};

