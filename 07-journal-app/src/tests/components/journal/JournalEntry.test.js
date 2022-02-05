import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";

import { JournalEntry } from "../../../components/journal/JournalEntry";
import { setActiveNote } from "../../../actions/notes";

const mockStore = configureStore();

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 1234,
  title: "Title",
  body: "body",
  date: 0,
  imageUrl: "https://www.test.com",
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe("Tests inside file 'JournalEntry.test.js'", () => {
  test("Must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Must call 'setActiveNote' action", () => {
    wrapper.find(".journal__entry").simulate("click");

    expect(store.dispatch).toHaveBeenCalledWith(setActiveNote(note.id, note));
  });
});
