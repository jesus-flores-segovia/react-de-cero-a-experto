import React, { useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from "../ui/Navbar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles.css";
import { CalendarEvent } from "./CalendarEvent";

moment.locale("en", {
  week: {
    dow: 1,
  },
});
moment.locale("en");

const localizer = momentLocalizer(moment);

const events = [
  {
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
];

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const doubleClickHandler = (event) => {
    console.log(event);
  };

  const selectEventHandler = (event) => {
    console.log(event);
  };

  const viewChangeHandler = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const eventStylesSetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return { style };
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
      />
    </div>
  );
};
