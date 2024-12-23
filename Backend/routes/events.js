import express from "express";
import eventModel from "../models/event.js";

const router = express.Router();

// Get events for a specific state
router.get("/:state", (req, res) => {
  const state = req.params.state;
  console.log(`Getting events for state: ${state}`);

  eventModel.findAllEvents(
    state,
    (dbRes) => {
      if (dbRes && dbRes.length > 0) {
        res.send(dbRes);
      } else {
        res.status(204);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      res.status(500);
      res.send({ error: dbErr.message });
    }
  );
});

// Add new event to a state
router.post("/:state", (req, res) => {
  const state = req.params.state;
  const event = req.body;
  console.log(`Adding event for state: ${state}`);

  eventModel.addEvent(
    state,
    event,
    (dbRes) => {
      if (dbRes) {
        res.status(201);
        res.send(dbRes);
      } else {
        res.status(400);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      if (dbErr.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ error: dbErr.message });
    }
  );
});

// Update existing event in a state
router.put("/:state", (req, res) => {
  const state = req.params.state;
  const event = req.body;
  console.log(`Updating event for state: ${state}`);

  if (!event._id) {
    res.status(400);
    res.send({ error: "Event ID is required" });
    return;
  }

  eventModel.editEvent(
    state,
    event,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(404);
        res.send({ error: "Event not found" });
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      if (dbErr.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ error: dbErr.message });
    }
  );
});

// Delete event from a state
router.delete("/:state/:id", (req, res) => {
  const state = req.params.state;
  const eventId = req.params.id;
  console.log(`Deleting event ${eventId} from state: ${state}`);

  eventModel.deleteEvent(
    state,
    eventId,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(404);
        res.send({ error: "Event not found" });
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      if (dbErr.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ error: dbErr.message });
    }
  );
});

export default router;