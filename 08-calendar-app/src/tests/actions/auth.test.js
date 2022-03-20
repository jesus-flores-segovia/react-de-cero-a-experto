import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import Swal from "sweetalert2";

import {
  startCheckingLoginState,
  startLogin,
  startRegister,
} from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Tests inside file 'auth.test.js'", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin action must be executed correctly", async () => {
    await store.dispatch(startLogin("floressegoviajesus@gmail.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startLogin action must be executed incorrectly", async () => {
    // Incorrect password
    await store.dispatch(startLogin("floressegoviajesus@gmail.com", "1234567"));

    const actions = store.getActions();

    expect(actions.length).toEqual(0);

    expect(Swal.fire).toHaveBeenCalledWith(
      "Cannot login",
      "The user or email is incorrect.",
      "error"
    );

    // Incorrect email
    await store.dispatch(startLogin("floressegoviajesuss@gmail.com", "123456"));

    expect(Swal.fire).toHaveBeenCalledWith(
      "Cannot login",
      "The user or email is incorrect.",
      "error"
    );
  });

  test("startRegister action must be executed correctly", async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123456",
          name: "test",
          token: "123456",
        };
      },
    }));

    await store.dispatch(startRegister("test", "test2@test.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "123456");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking action must be executed correctly", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123456",
          name: "test",
          token: "123456",
        };
      },
    }));

    await store.dispatch(startCheckingLoginState());

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123456",
        name: "test",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "123456");
  });
});
