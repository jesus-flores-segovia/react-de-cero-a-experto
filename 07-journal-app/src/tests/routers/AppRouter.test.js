import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { act } from "@testing-library/react";

import { AppRouter } from "../../routers/AppRouter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { login } from "../../actions/auth";
import { startLoadingNotes, setNotes } from "../../actions/notes";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

jest.mock("../../actions/notes", () => ({
  startLoadingNotes: jest.fn(),
}));

const user = {
  email: "test@test.com",
  password: "123456",
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: { active: null },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Tests inside file 'AppRouter.test.js'", () => {
  test("Must login the user if is previously authenticated", async () => {
    await act(async () => {
      await signInWithEmailAndPassword(auth, user.email, user.password);

      mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
    expect(startLoadingNotes).toHaveBeenCalled();
  });
});
