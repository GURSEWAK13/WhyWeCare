import statesAndCities from "./states.js";
import mongoose from "mongoose";

// Create schema for events
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create state-specific models
const stateModels = {};
statesAndCities.forEach(state => {
  // Replace spaces with underscores for model names
  const modelName = `Event_${state.replace(/\s+/g, '_')}`;
  stateModels[state] = mongoose.model(modelName, eventSchema);
});

// Create event model object
const eventModel = {};

eventModel.findAllEvents = async (state, successCallback, errorCallback) => {
  try {
    const model = stateModels[state];
    if (!model) {
      throw new Error(`Invalid state: ${state}`);
    }
    const dbRes = await model.find();
    console.log("GET | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("GET | dbErr is: ", dbErr);
    errorCallback(dbErr);
  }
};

eventModel.addEvent = async (state, event, successCallback, errorCallback) => {
  try {
    const model = stateModels[state];
    if (!model) {
      throw new Error(`Invalid state: ${state}`);
    }
    const dbRes = await model.create(event);
    console.log("POST | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("POST | dbErr is: ", dbErr);
    errorCallback(dbErr);
  }
};

eventModel.editEvent = async (state, event, successCallback, errorCallback) => {
  try {
    const model = stateModels[state];
    if (!model) {
      throw new Error(`Invalid state: ${state}`);
    }
    const dbRes = await model.findByIdAndUpdate(
      event._id,
      event,
      { new: true } // Return updated document
    );
    console.log("EDIT | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("EDIT | dbErr is: ", dbErr);
    errorCallback(dbErr);
  }
};

eventModel.deleteEvent = async (state, id, successCallback, errorCallback) => {
  try {
    const model = stateModels[state];
    if (!model) {
      throw new Error(`Invalid state: ${state}`);
    }
    const dbRes = await model.findByIdAndDelete(id);
    console.log("DELETE | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("DELETE | dbErr is: ", dbErr);
    errorCallback(dbErr);
  }
};

export default eventModel;