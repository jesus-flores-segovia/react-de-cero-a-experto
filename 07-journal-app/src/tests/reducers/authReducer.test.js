import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe("Tests inside file 'authReducer.test.js'", () => {

    test("'login' action must return the state with the information of the user", () => {
        
        const action = {
            type: types.login, 
            payload: {
                uid: "123456", 
                displayName: "Jesús Flores Segovia"
            }
        };
        
        const state = authReducer({}, action);
        
        expect(state).toStrictEqual({uid: action.payload.uid, name: action.payload.displayName});
    })

    test("'logout' action must return an empty state", () => {
        const action = {
            type: types.logout
        };
        
        const state = authReducer({}, action);
        
        expect(state).toStrictEqual({});
    })

    test("When a non defined action is sent, must return the actual state", () => {
        const action = {
            type: ""
        };
        
        const state = authReducer({}, action);
        
        expect(state).toStrictEqual({});
    })
})