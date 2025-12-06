import CalendarModel from "../models/Calendar.model.js";
import EventModel from "../models/Event.model.js";

export default {
    get_calendars: async (req, res) => {
        const calendar_documents = (await CalendarModel.find({ owner: req.user.id })).map(calendar => calendar.toClient());
        calendar_documents.push({
            id: "holidays",
            owner: req.user.id,
            title: "Holidays",
            description: "You know, holidays",
            color: "#f5c211",
            type: "main",
        });

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
    get_holidays_events: async (req, res) => {
        const year = req.params.year;
        const month = req.params.month;

        const nager_date_response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/UA`);
        const nager_date_data = await nager_date_response.json();
        const events = nager_date_data
            .filter(holiday => new Date(holiday.date).getMonth() === month - 1)
            .map(holiday => ({
                id: "",
                owner: req.user.id,
                calendar: "holidays",
                title: holiday.name,
                description: "A holiday, you know, chill",
                start: holiday.date,
                rrule: "",
                color: "#2ec27e",
                type: "Holiday",
                categories: holiday.types,
            }));

        return res.json({
            status: "success",
            message: "Successfully got the calendar events!",
            data: {
                events,
            },
        });
    },
    get_calendar_events: async (req, res) => {
        const event_documents = await EventModel.find({ owner: req.user.id, calendar: req.calendar.id });
        const events = event_documents.map(event_document => event_document.toClient());

        return res.json({
            status: "success",
            message: "Successfully got the calendar events!",
            data: {
                events,
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

