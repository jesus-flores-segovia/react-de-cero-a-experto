import { new_todo } from "./todos";

export const ADD_TODO = {
    type: "add",
    payload: new_todo
};

export const DELETE_TODO = {
    type: "delete",
    payload: 1
};

export const TOGGLE_TODO = {
    type: "toggle",
    payload: 1
};