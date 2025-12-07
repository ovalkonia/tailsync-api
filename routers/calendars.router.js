import express from "express";

import auth_middleware from "../middlewares/auth.middleware.js";
import calendar_fetch_middleware from "../middlewares/calendar_fetch.middleware.js";

import calendars_controller from "../controllers/calendars.controller.js";

const calendars_router = express.Router();

// GET

calendars_router.get("/calendars", auth_middleware(), calendars_controller.get_calendars);
calendars_router.get("/calendars/:calendar_id", auth_middleware(), calendar_fetch_middleware(), calendars_controller.get_calendar);
calendars_router.get("/calendars/holidays/events/all/:year", auth_middleware(), calendars_controller.get_holidays_events);
calendars_router.get("/calendars/:calendar_id/events/all/:year", auth_middleware(), calendar_fetch_middleware(), calendars_controller.get_calendar_events);

// POST

calendars_router.post("/calendars", auth_middleware(), calendars_controller.post_calendar);
calendars_router.post("/calendars/:calendar_id/share", auth_middleware(), calendar_fetch_middleware(), calendars_controller.post_calendar_share);
calendars_router.post("/calendars/join/:token", auth_middleware(), calendars_controller.post_calendar_join);

// PATCH

calendars_router.patch("/calendars/:calendar_id", calendar_fetch_middleware(), auth_middleware(), calendars_controller.patch_calendar);

// DELETE

calendars_router.delete("/calendars/:calendar_id", calendar_fetch_middleware(), auth_middleware(), calendars_controller.delete_calendar);

export default calendars_router;

