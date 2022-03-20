import { types } from "../types/types";

import moment from "moment";

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.calendarNewEvent:
      return { ...state, events: [...state.events, action.payload] };
    case types.calendarSetActiveEvent:
      return { ...state, activeEvent: action.payload };
    case types.calendarUpdateEvent:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case types.calendarDeleteEvent:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };
    case types.calendarSetLoadedEvents:
      return { ...state, events: [...action.payload] };
    case types.calendarLogoutCleanEvents:
      return initialState;
    default:
      return state;
  }
};
