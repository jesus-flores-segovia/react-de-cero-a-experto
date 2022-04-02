import { Provider } from "react-redux";
import { AppRouter } from "../../routers/AppRouter";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Tests inside file 'AppRouter.js'", () => {
  test("Must show the initial loading message", () => {
    const initState = {
      auth: {
        isLoggedIn: false,
        isCheckingLoginState: true,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text()).toEqual("Checking");
  });

  test("Must show the public router when the user isn't logged", () => {
    const initState = {
      auth: {
        isLoggedIn: false,
        isCheckingLoginState: false,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("Must show the private router when the user is logged", () => {
    const initState = {
      auth: {
        isLoggedIn: true,
        isCheckingLoginState: false,
        uid: "123",
        name: "Jesús",
      },
      calendar: {
        events: [],
      },
      ui: { modalOpen: false },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
