import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import { mount } from "enzyme";

import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { useForm } from "../../../hooks/useForm";

const user = {
  name: "Jesús",
  email: "",
  password: "",
};

jest.mock("../../../hooks/useForm", () => ({
  useForm: jest.fn().mockReturnValue([user, jest.fn(), jest.fn()]),
}));

const mockStore = configureStore();
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: "Email is not valid",
  },
  notes: {
    notes: [],
    active: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Tests inside file 'RegisterScreen.test.js'", () => {
  test("'RegisterScreen' must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("The form submit must validate if an error has been produced", () => {
    const emailInput = wrapper.find('input[name="email"]');

    emailInput.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "[UI] Set Error",
      payload: "Email is not valid",
    });
  });

  test("Must show the message error box", () => {
    const msgErrorWrapper = wrapper.find(".auth__alert-error");

    expect(msgErrorWrapper.exists()).toBe(true);
    expect(msgErrorWrapper.text().trim()).toBe(initState.ui.msgError);
  });
});
