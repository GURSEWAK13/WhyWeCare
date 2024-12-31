import express from "express";
import eventService from "../models/event.js";

const router = express.Router();

// Get all events or events by state
router.get("/:state?", async (req, res) => {
  try {
    const state = req.params.state;
    const events = await eventService.findAllEvents(state);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new event
router.post("/", async (req, res) => {
  try {
    const event = req.body;
    const newEvent = await eventService.addEvent(event);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(error.name === "ValidationError" ? 400 : 500)
      .json({ error: error.message });
  }
});

// Update event
router.put("/:id", async (req, res) => {
  try {
    const event = await eventService.editEvent(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(error.name === "ValidationError" ? 400 : 500)
      .json({ error: error.message });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;