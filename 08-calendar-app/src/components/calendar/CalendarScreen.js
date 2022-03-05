import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import {
  calendarDeleteEvent,
  calendarSetActiveEvent,
} from "../../actions/calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles.css";
import { FloatingActionButton } from "../ui/FloatingActionButton";
import Swal from "sweetalert2";

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

  const eventStylesSetter = () => {
    const style = {
      backgroundColor: "#367CF7",
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
    Swal.fire({
      title: "Do you want to delete the event?",
      showCancelButton: true,
      confirmButtonText: "Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("The event was deleted", "", "success");
        dispatch(calendarDeleteEvent());
      } else if (result.isDenied) {
        Swal.fire("The event was not deleted", "", "info");
      }
    });
  };

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
