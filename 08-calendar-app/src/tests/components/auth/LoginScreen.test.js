import { LoginScreen } from "../../../components/auth/LoginScreen";
import { mount } from "enzyme";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    isLoggedIn: false,
    isCheckingLoginState: true,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("Tests inside file 'LoginScreen.test.js'", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Must call the login dispatch", () => {
    wrapper.find("input[name='loginEmail']").simulate("change", {
      target: {
        name: "loginEmail",
        value: "floressegoviajesus@gmail.com",
      },
    });

    wrapper.find("input[name='loginPassword']").simulate("change", {
      target: {
        name: "loginPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith(
      "floressegoviajesus@gmail.com",
      "123456"
    );
  });

  test("The user cannot register if the validation isn't correct", () => {
    wrapper.find("input[name='registerName']").simulate("change", {
      target: {
        name: "registerName",
        value: "Jesús",
      },
    });

    wrapper.find("input[name='registerEmail']").simulate("change", {
      target: {
        name: "registerEmail",
        value: "floressegoviajesus@gmail.com",
      },
    });

    wrapper.find("input[name='registerPassword']").simulate("change", {
      target: {
        name: "registerPassword",
        value: "123456",
      },
    });

    wrapper.find("input[name='registerPassword2']").simulate("change", {
      target: {
        name: "registerPassword2",
        value: "1234567",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startRegister).toBeCalledTimes(0);

    expect(Swal.fire).toHaveBeenCalledWith(
      "Cannot register",
      "Password fields must match",
      "error"
    );
  });

  test("Must be register the user if the validation is ok", () => {
    wrapper.find("input[name='registerName']").simulate("change", {
      target: {
        name: "registerName",
        value: "Jesús",
      },
    });

    wrapper.find("input[name='registerEmail']").simulate("change", {
      target: {
        name: "registerEmail",
        value: "floressegoviajesus@gmail.com",
      },
    });

    wrapper.find("input[name='registerPassword']").simulate("change", {
      target: {
        name: "registerPassword",
        value: "123456",
      },
    });

    wrapper.find("input[name='registerPassword2']").simulate("change", {
      target: {
        name: "registerPassword2",
        value: "123456",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startRegister).toBeCalledTimes(1);

    expect(Swal.fire).toHaveBeenCalledTimes(0);
  });
});
