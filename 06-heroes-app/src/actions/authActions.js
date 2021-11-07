import { types } from "../types/types";

export const login = (userName) => {
    return ( 
        {
            type: types.login,
            payload: userName
        }
    );
};

export const logout = () => {
    return ( 
        {
            type: types.logout,
        }
    );
};