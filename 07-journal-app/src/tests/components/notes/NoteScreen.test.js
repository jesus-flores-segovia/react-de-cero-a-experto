import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import { setActiveNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock("../../../actions/notes", () => ({
  setActiveNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 1234,
      title: "title",
      body: "body",
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("Tests inside file 'NoteScreen.test.js'", () => {
  test("Must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Must call 'setActiveNote' with the correct changes", () => {
    wrapper.find("input[name='title']").simulate("change", {
      target: {
        name: "title",
        value: "title changed",
      },
    });

    expect(setActiveNote).toHaveBeenCalledWith(1234, {
      title: "title changed",
      body: "body",
      id: 1234,
      date: 0,
    });
  });
});
