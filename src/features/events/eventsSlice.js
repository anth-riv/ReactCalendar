import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

// Create a slice for events with reducers to handle adding, updating, and deleting events
export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // Reducer to add a new event
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    // Reducer to edit an existing event
    editEvent: (state, action) => {
      const { id, title, date, time, description } = action.payload;
      const existingEvent = state.events.find(event => event.id === id);
      if (existingEvent) {
        existingEvent.title = title;
        existingEvent.date = date;
        existingEvent.time = time;
        existingEvent.description = description;
      }
    },
    // Reducer to delete an event
    deleteEvent: (state, action) => {
      const eventId = action.payload;
      state.events = state.events.filter(event => event.id !== eventId);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
