import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import {
  calendarSetActiveEvent,
  startCalendarDeleteEvent,
  startCalendarLoadEvents,
} from "../../actions/calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles.css";
import { FloatingActionButton } from "../ui/FloatingActionButton";

moment.locale("en", {
  week: {
    dow: 1,
  },
});
moment.locale("en");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const doubleClickHandler = () => {
    dispatch(uiOpenModal());
  };

  const selectEventHandler = (event) => {
    dispatch(calendarSetActiveEvent(event));
  };

  const selectSlotHandler = () => {
    dispatch(calendarSetActiveEvent(null));
  };

  const viewChangeHandler = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const eventStylesSetter = (event) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return { style };
  };

  const addNewEvent = () => {
    dispatch(calendarSetActiveEvent(null));
    dispatch(uiOpenModal());
  };

  const deleteEvent = () => {
    dispatch(startCalendarDeleteEvent(activeEvent));
  };

  useEffect(() => {
    dispatch(startCalendarLoadEvents());
  }, []);

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStylesSetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={doubleClickHandler}
        onSelectEvent={selectEventHandler}
        onView={viewChangeHandler}
        view={lastView}
        onSelectSlot={selectSlotHandler}
        selectable={true}
      />
      <FloatingActionButton
        className="btn btn-primary fab"
        onClick={addNewEvent}
      >
        <i className="fas fa-plus" />
      </FloatingActionButton>
      {activeEvent && (
        <FloatingActionButton
          className="btn btn-danger fab-danger"
          onClick={deleteEvent}
        >
          <i className="fas fa-trash" />
          <span> Delete event</span>
        </FloatingActionButton>
      )}
      <CalendarModal />
    </div>
  );
};
