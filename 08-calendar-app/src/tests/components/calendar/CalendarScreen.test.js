import { LoginScreen } from "../../../components/auth/LoginScreen";
import { mount } from "enzyme";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { types } from "../../../types/types";
import {
  calendarSetActiveEvent,
  startCalendarLoadEvents,
} from "../../../actions/calendar";
import { act } from "@testing-library/react";

jest.mock("../../../actions/calendar", () => ({
  calendarSetActiveEvent: jest.fn(),
  startCalendarLoadEvents: jest.fn(),
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
    activeEvent: null,
  },
  ui: { modalOpen: false },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("Tests inside file 'CalendarScreen.test.js'", () => {
  test("Must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Testing the calendar interactions", () => {
    const calendar = wrapper.find("Calendar");

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop("onSelectEvent")({ start: "Hello" });
    expect(calendarSetActiveEvent).toHaveBeenCalledWith({ start: "Hello" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
