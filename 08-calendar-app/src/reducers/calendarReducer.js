import { types } from "../types/types";

import moment from "moment";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "Boss Birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#fafafa",
      notes: "Purchase the cake",
      user: {
        _id: "1234",
        name: "Jesús",
      },
    },
  ],
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
    default:
      return state;
  }
};
