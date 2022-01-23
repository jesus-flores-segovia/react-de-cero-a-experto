import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("Tests inside file 'auth.test.js'", () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test("The login and logout actions must return the properly actions", () => {
        const loginAction = login("uid", "Jesús Flores Segovia");

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid: "uid",
                displayName: "Jesús Flores Segovia"
            }
        })

        const logoutAction = logout();

        expect(logoutAction).toEqual({
            type: types.logout
        })
    })

    test("The 'startLogout' action must do the logout in Firebase", async() => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    })

    test("The 'startLoginEmailPassword' action must login the user", async() => {
        await store.dispatch(startLoginEmailPassword("test@test.com", "password"));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        });

        expect(actions[2]).toEqual({
            type: types.uiFinishLoading
        });
    })

})