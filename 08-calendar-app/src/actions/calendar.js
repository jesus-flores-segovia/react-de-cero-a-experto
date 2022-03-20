import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { parseEvents } from "../helpers/parseEvents";
import { types } from "../types/types";

export const startCalendarAddNewEvent = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const response = await fetchWithToken("events", "POST", event);
      const body = await response.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(calendarAddNewEvent(event));
      }
    } catch (error) {
      Swal.fire("Error", "An error has ocurred", "error");
    }
  };
};

export const startCalendarLoadEvents = () => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken("events", "GET");
      const body = await response.json();

      if (body.ok) {
        dispatch(calendarSetLoadedEvents(parseEvents(body.events)));
      }
    } catch (error) {
      Swal.fire("Error", "An error has ocurred", "error");
    }
  };
};

export const startCalendarUpdateEvent = (event) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken(`events/${event.id}`, "PUT", event);
      const body = await response.json();

      if (body.ok) {
        dispatch(calendarUpdateEvent(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error has ocurred", "error");
    }
  };
};

export const startCalendarDeleteEvent = (event) => {
  return async (dispatch) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        html: `Do you want to remove the event '${event.title}'`,
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetchWithToken(
            `events/${event.id}`,
            "DELETE",
            event
          );
          const body = await response.json();

          if (body.ok) {
            Swal.fire(
              "Event deleted!",
              `The event '${event.title}' was deleted succesfully.`,
              "success"
            );
            dispatch(calendarDeleteEvent(event));
          } else {
            Swal.fire("Error", body.msg, "error");
          }
        }
      });
    } catch (error) {
      Swal.fire("Error", "An error has ocurred", "error");
    }
  };
};

const calendarAddNewEvent = (event) => ({
  type: types.calendarNewEvent,
  payload: event,
});

export const calendarSetActiveEvent = (event) => ({
  type: types.calendarSetActiveEvent,
  payload: event,
});

const calendarUpdateEvent = (event) => ({
  type: types.calendarUpdateEvent,
  payload: event,
});

const calendarDeleteEvent = (event) => ({
  type: types.calendarDeleteEvent,
  payload: event,
});

const calendarSetLoadedEvents = (events) => ({
  type: types.calendarSetLoadedEvents,
  payload: events,
});

export const calendarLogoutCleanEvents = () => ({
  type: types.calendarLogoutCleanEvents,
});
