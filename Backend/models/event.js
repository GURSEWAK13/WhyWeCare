import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'BLOOD DONATION',
      'CHARITY',
      'PROTEST',
      'VOLUNTEER',
      'ADOPTION',
      'OTHER'
    ]
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const EventModel = mongoose.model('Event', eventSchema);

const eventService = {
  findAllEvents: async (state = null) => {
    try {
      if (!state || state === 'all') {
        return await EventModel.find();
      }
      return await EventModel.find({ state });
    } catch (error) {
      throw error;
    }
  },

  addEvent: async (event) => {
    try {
      const newEvent = new EventModel(event);
      return await newEvent.save();
    } catch (error) {
      throw error;
    }
  },

  editEvent: async (eventId, eventData) => {
    try {
      return await EventModel.findByIdAndUpdate(
        eventId,
        eventData,
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      return await EventModel.findByIdAndDelete(eventId);
    } catch (error) {
      throw error;
    }
  }
};

export default eventService;