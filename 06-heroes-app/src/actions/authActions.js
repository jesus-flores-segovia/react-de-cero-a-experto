import { types } from "../types/types";

export const login = (userName) => {
    return ( 
        {
            type: types.login,
            payload: userName
        }
    );
};