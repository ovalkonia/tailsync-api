import { Resend } from "resend";
import ApiError from "../errors/Api.error.js";
import CalendarError from "../errors/Calendar.error.js";
import UserError from "../errors/User.error.js";
import CalendarModel from "../models/Calendar.model.js";
import EventModel from "../models/Event.model.js";
import UserModel from "../models/User.model.js";
import CalendarJoinTokenUtil from "../utils/CalendarJoinToken.util.js";

export default {
    get_calendars: async (req, res) => {
        const calendar_documents = (await CalendarModel
            .find({
                $or: [
                    { owner: req.user.id },
                    { "members.user": req.user.id },
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
        if (req.user.email === req.body.email) {
            throw ApiError.FORBIDDEN();
        }

        const user_document = await UserModel.findOne({ email: req.body.email }).exec();
        if (!user_document) {
            throw UserError.DOESNT_EXIST();
        }

        const calendar_join_token_util = CalendarJoinTokenUtil.issue(user_document.id, req.calendar.id, req.body.role);
        const calendar_join_token = calendar_join_token_util.sign();

        const link = `${[process.env.URL_FRONTEND]}/calendars/join/${calendar_join_token}`;
        console.log(`Shared: ${link}`);

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: process.env.RESEND_FROM,
            to: req.body.email,
            subject: "Join My Calendar!",
            html: `Join <strong>${req.user.name}'s</strong> Calendar <strong>${req.calendar.title}</strong> <a href="${link}">here</a>`,
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
            !req.user.id.equals(calendar_join_token_util.user_id)) {
            throw ApiError.FORBIDDEN();
        }

        if (req.calendar.members.find(member => member.user.equals(calendar_join_token_util.user_id))) {
            throw UserError.ALREADY_JOINED();
        }

        await CalendarModel.findByIdAndUpdate(calendar_join_token_util.calendar_id, {
            $push: {
                members: {
                    user: calendar_join_token_util.user_id,
                    role: calendar_join_token_util.role,
                },
            },
        });

        const owner_document = await UserModel.findById(req.calendar.owner);
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: process.env.RESEND_FROM,
            to: owner_document.email,
            subject: "Calendar Member Joined!",
            html: `A new member <strong>${req.user.name}</strong> joined your calendar <strong>${req.calendar.title}</strong>`,
        });

        return res.json({
            status: "success",
            message: "Successfully joined the calendar",
        });
    },
    patch_calendar: async (req, res) => {
        if (!req.calendar.owner.equals(req.user.id)) {
            throw ApiError.FORBIDDEN();
        }

        await CalendarModel.findByIdAndUpdate(req.calendar.id, req.body);

        const owner_document = await UserModel.findById(req.calendar.owner);
        const resend = new Resend(process.env.RESEND_API_KEY);
        for (const member of req.calendar.members) {
            const user_document = await UserModel.findById(member.user);
            if (!user_document) {
                continue;
            }

            await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: user_document.email,
                subject: "Celendar Updated!",
                html: `<strong>${owner_document.name}</strong>'s calendar <strong>${req.calendar.title}</strong> was updated`,
            });
        }

        return res.json({
            status: "success",
            message: "Successfully patched the calendar!",
        });
    },
    delete_calendar: async (req, res) => {
        if (!req.calendar.owner.equals(req.user.id) ||
            req.calendar.type === "main") {
            throw ApiError.FORBIDDEN();
        }

        await CalendarModel.findByIdAndDelete(req.calendar.id);

        const owner_document = await UserModel.findById(req.calendar.owner);
        const resend = new Resend(process.env.RESEND_API_KEY);
        for (const member of req.calendar.members) {
            const user_document = await UserModel.findById(member.user);
            if (!user_document) {
                continue;
            }

            await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: user_document.email,
                subject: "Celendar Deleted!",
                html: `<strong>${owner_document.name}</strong>'s calendar <strong>${req.calendar.title}</strong> was deleted`,
            });
        }

        return res.json({
            status: "success",
            message: "Successfully deleted the calendar!",
        });
    },
    delete_calendar_leave: async (req, res) => {
        await CalendarModel.findByIdAndUpdate(req.calendar.id, {
            $pull: {
                members: { user: req.user.id },
            },
        });

        const owner_document = await UserModel.findById(req.calendar.owner);
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: process.env.RESEND_FROM,
            to: owner_document.email,
            subject: "Calendar Member Left!",
            html: `Your calendar's <strong>${req.calendar.title}</strong> member <strong>${req.user.name}</strong> left`,
        });

        return res.json({
            status: "success",
            message: "Successfully left the calendar",
        });
    }
};

