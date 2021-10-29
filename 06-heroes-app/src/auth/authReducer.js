import { types } from "../types/types";

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                name: action.payload,
                logged: true
            }
        case types.logout:
            return {
                ...state,
                name: "",
                logged: false
            }
    
        default:
            return state;
    }
}