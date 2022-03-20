import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { customStyles, initialEvent } from "./helpers/CalendarModalConfig";
import { uiCloseModal } from "../../actions/ui";
import {
  calendarSetActiveEvent,
  startCalendarAddNewEvent,
  startCalendarUpdateEvent,
} from "../../actions/calendar";

import Modal from "react-modal/lib/components/Modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";

import "../styles.css";

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialEvent);
  const [isValidTitle, setIsValidTitle] = useState(true);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    activeEvent ? setFormValues(activeEvent) : setFormValues(initialEvent);
  }, [activeEvent]);

  function closeModal() {
    dispatch(calendarSetActiveEvent(null));
    dispatch(uiCloseModal());
  }

  const handleStartDateChange = (date) => {
    setFormValues({ ...formValues, start: date });
  };

  const handleFinalDateChange = (date) => {
    setFormValues({ ...formValues, end: date });
  };

  const handleFormValues = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "Initial date must be defined before than the final date",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setIsValidTitle(!isValidTitle);
    }
    setIsValidTitle(true);

    if (activeEvent) {
      console.log(activeEvent);
      dispatch(startCalendarUpdateEvent({ ...formValues, id: activeEvent.id }));
    } else {
      dispatch(startCalendarAddNewEvent(formValues));
    }

    setFormValues(initialEvent);

    closeModal();
  };

  return (
    <Modal
      className="modal"
      closeTimeoutMS={200}
      isOpen={modalOpen}
      onRequestClose={closeModal}
      overlayClassName="modal-background"
      style={customStyles}
    >
      <h1>{activeEvent ? "Update the event" : "Create a new event"}</h1>
      <hr />
      <form className="container" onSubmit={handleFormSubmit} noValidate>
        <div className="form-group">
          <label>Initial date and hour</label>
          <DateTimePicker
            className="form-control"
            onChange={handleStartDateChange}
            value={formValues.start}
          />
        </div>

        <div className="form-group">
          <label>Final date and hour</label>
          <DateTimePicker
            className="form-control"
            minDate={formValues.start}
            onChange={handleFinalDateChange}
            value={formValues.end}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${!isValidTitle && "is-invalid"}`}
            placeholder="Event title"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={handleFormValues}
          />
          <small id="emailHelp" className="form-text text-muted">
            A short event description
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={handleFormValues}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information about the event
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
