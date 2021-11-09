import { login, logout } from "../../actions/authActions";
import { authReducer } from "../../auth/authReducer"

describe("Tests inside file 'authReducer.test.js'", () => {

    test("Must return the default state", () => {
        const action = {
            type: ""
        };
        expect(authReducer({logged:false}, action)).toEqual({logged:false});
    })

    test("Must allows to authenticate an user and save the user name", () => {
        const username = "Jesús";
        const state = authReducer({}, login(username));
        expect(state.logged).toBeTruthy();
        expect(state.name).toBe(username);
    })

    test("Must erase the user name and set the logged state as false", () => {
        const state = authReducer({}, logout());
        expect(state.logged).toBeFalsy();
        expect(state.name).toBe("");
    })
})