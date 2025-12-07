import { Resend } from "resend";
import ApiError from "../errors/Api.error.js";
import CalendarError from "../errors/Calendar.error.js";
import CalendarModel from "../models/Calendar.model.js";
import EventModel from "../models/Event.model.js";
import CalendarJoinTokenUtil from "../utils/CalendarJoinToken.util.js";

export default {
    get_calendars: async (req, res) => {
        const calendar_documents = (await CalendarModel
            .find({
                $or: [
                    { owner: req.user.id },
                    {
                        members: {
                            $elemMatch: {
                                user: req.user.id,
                            },
                        },
                    },
                ],
            }))
            .map(calendar => calendar.toClient());
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

        const nager_date_response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/UA`);
        const nager_date_data = await nager_date_response.json();
        const events = nager_date_data.map(holiday => ({
            id: "",
            owner: req.user.id,
            calendar: "holidays",
            title: holiday.name,
            description: "A holiday, you know, chill",
            start: holiday.date,
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
        const event_documents = await EventModel.find({
            calendar: req.calendar.id,
        });
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
    post_calendar_share: async (req, res) => {
        const calendar_join_token_util = CalendarJoinTokenUtil.issue(req.user.id, req.calendar.id);
        const calendar_join_token = calendar_join_token_util.sign();

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: process.env.RESEND_FROM,
            to: req.body.email,
            subject: "Join My Calendar!",
            html: `Join <strong>${req.user.name}'s</strong> Calendar <strong>${req.calendar.title}</strong> <a href="${[process.env.URL_FRONTEND]}/calendars/join/${calendar_join_token}">here</a>`,
        });

        return res.json({
            status: "success",
            message: "Successfully sent the invitation letter!",
        });
    },
    post_calendar_join: async (req, res) => {
        const calendar_join_token_util = CalendarJoinTokenUtil.parse(req.params.token);
        const calendar_document = await CalendarModel.findById(calendar_join_token_util.calendar_id);
        if (!calendar_document) {
            throw CalendarError.DOESNT_EXIST();
        }

        req.calendar = calendar_document.toClient();
        if (!calendar_join_token_util.is_valid() ||
            req.user.id.equals(req.calendar.owner)) {
            throw ApiError.UNAUTHORIZED();
        }

        await CalendarModel.findByIdAndUpdate(req.calendar.id, {
            $push: {
                members: { user: req.user.id },
            },
        });

        return res.json({
            status: "success",
            message: "Successfully joined the calendar",
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

