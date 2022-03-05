import { types } from "../types/types";

export const calendarAddNewEvent = (event) => ({
  type: types.calendarNewEvent,
  payload: event,
});

export const calendarSetActiveEvent = (event) => ({
  type: types.calendarSetActiveEvent,
  payload: event,
});

export const calendarUpdateEvent = (event) => ({
  type: types.calendarUpdateEvent,
  payload: event,
});

export const calendarDeleteEvent = () => ({
  type: types.calendarDeleteEvent,
});
