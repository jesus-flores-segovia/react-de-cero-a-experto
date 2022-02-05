import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {},
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Tests inside file 'Sidebar.test.js'", () => {
  test("Must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Must call the 'startLogout' action", () => {
    const logoutButton = wrapper.find(".buttons__btn");

    logoutButton.simulate("click");

    expect(startLogout).toHaveBeenCalled();
  });

  test("Must call the 'startNewNote' action", () => {
    const addNewNoteWrapper = wrapper.find(".journal__new-entry");

    addNewNoteWrapper.simulate("click");

    expect(startNewNote).toHaveBeenCalled();
  });
});
