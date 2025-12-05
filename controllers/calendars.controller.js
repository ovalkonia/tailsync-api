import CalendarModel from "../models/Calendar.model.js";

export default {
    get_calendars: async (req, res) => {
        const calendar_documents = (await CalendarModel.find({ owner: req.user.id })).map(calendar => calendar.toClient());

        return res.json({
            status: "success",
            message: "Successfully got all the calendars!",
            data: {
                calendars: calendar_documents,
            },
        });
    },
    get_calendar: async (req, res) => {
        const calendar = req.calendar;

        return res.json({
            status: "success",
            message: "Successfully got the calendar!",
            data: {
                calendar,
            },
        });
    },
    post_calendar: async (req, res) => {
        await CalendarModel.create({
            ...req.body,
            owner: req.user.id,
        });

        return res.json({
            status: "success",
            message: "Successfully posted the calendar!",
        });
    },
    patch_calendar: async (req, res) => {
        await CalendarModel.findByIdAndUpdate(req.calendar.id, req.body);

        return res.json({
            status: "success",
            message: "Successfully patched the calendar!",
        });
    },
    delete_calendar: async (req, res) => {
        await CalendarModel.findByIdAndDelete(req.calendar.id);

        return res.json({
            status: "success",
            message: "Successfully deleted the calendar!",
        });
    },
};

