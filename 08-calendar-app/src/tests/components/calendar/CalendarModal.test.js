import { mount } from "enzyme";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import {
  nowDate,
  nowDatePlusOne,
} from "../../../components/calendar/helpers/CalendarModalConfig";
import {
  calendarSetActiveEvent,
  startCalendarLoadEvents,
  startCalendarUpdateEvent,
  startCalendarAddNewEvent,
} from "../../../actions/calendar";
import { uiCloseModal } from "../../../actions/ui";
import { types } from "../../../types/types";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));
jest.mock("../../../actions/calendar", () => ({
  calendarSetActiveEvent: jest.fn(),
  startCalendarLoadEvents: jest.fn(),
  startCalendarUpdateEvent: jest.fn(),
  startCalendarAddNewEvent: jest.fn(),
}));

jest.mock("../../../actions/ui", () => ({
  uiCloseModal: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    isLoggedIn: true,
    isCheckingLoginState: false,
    uid: "123",
    name: "Jesús",
  },
  calendar: {
    events: [],
    activeEvent: {
      title: "title",
      notes: "notes",
      start: nowDate.toDate(),
      end: nowDatePlusOne.toDate(),
    },
  },
  ui: { modalOpen: true },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Tests inside file 'CalendarModal.test.js'", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Must be shown the Modal component", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("Must be update the event and close the modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(startCalendarUpdateEvent).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(calendarSetActiveEvent).toHaveBeenCalledWith(null);
    expect(uiCloseModal).toHaveBeenCalledTimes(1);
  });

  test("Must show an error if the validation isn't correct", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find("input[name='title']").hasClass("is-invalid")).toBe(
      true
    );
  });

  test("Must create a new event", () => {
    const initState = {
      auth: {
        isLoggedIn: true,
        isCheckingLoginState: false,
        uid: "123",
        name: "Jesús",
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: { modalOpen: true },
    };
    let store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find("input[name='title']").simulate("change", {
      target: {
        name: "title",
        value: "testing",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(startCalendarAddNewEvent).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "testing",
      notes: "",
    });

    expect(calendarSetActiveEvent).toHaveBeenCalledWith(null);
    expect(uiCloseModal).toHaveBeenCalledTimes(1);
  });

  test("Must validate the dates", () => {
    wrapper.find("input[name='title']").simulate("change", {
      target: {
        name: "title",
        value: "testing",
      },
    });

    const date = new Date();

    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(date);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Initial date must be defined before than the final date",
      "error"
    );
  });
});
