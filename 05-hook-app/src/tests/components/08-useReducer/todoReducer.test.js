import {todoReducer} from "../../../components/08-useReducer/todoReducer";
import {todos, new_todo} from "./fixtures/todos";
import {ADD_TODO, DELETE_TODO, TOGGLE_TODO} from "./fixtures/actions";

describe("Tests inside file todoReducer.test.js", () => {

    test("'todoReducer' must return the default case option", () => {
        const state = todoReducer(todos, {});

        expect(state).toBe(todos);
    });

    test("'todoReducer' add action, must add a new element in the state between the reducer", () => {
        const state = todoReducer(todos, ADD_TODO);

        expect(state).toHaveLength(3);
        expect(state.find((value) => value.id === new_todo.id)).not.toBeUndefined();
        expect(state).toEqual([...todos, new_todo]);
    });

    test("'todoReducer' delete action, must delete a new element in the state between the reducer", () => {
        const state = todoReducer(todos, DELETE_TODO);

        expect(state).toHaveLength(1);
        expect(state.find((value) => value.id === 1)).toBeUndefined();
        expect(state).toEqual([...todos].filter((value) => value.id !== 1));
    });

    test("'todoReducer' toggle action, must update the status of an element in the state between the reducer", () => {
        const state = todoReducer(todos, TOGGLE_TODO);

        expect(state.find((value) => value.id === 1).done).toBe(true);
        expect(state[1]).toEqual(todos[1]);
    });

});