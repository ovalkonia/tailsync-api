import express from "express";

import auth_middleware from "../middlewares/auth.middleware.js";
import event_fetch_middleware from "../middlewares/event_fetch.middleware.js";

import events_controller from "../controllers/events.controller.js";

const event_router = express.Router();

// GET

event_router.get("/events", auth_middleware(), events_controller.get_events);

// POST

event_router.post("/events", auth_middleware(), events_controller.post_event);

// PATCH

event_router.patch("/events/:event_id", event_fetch_middleware(), auth_middleware(), events_controller.patch_event);

// DELETE

event_router.delete("/events/:event_id", event_fetch_middleware(), auth_middleware(), events_controller.delete_event);

export default event_router;

