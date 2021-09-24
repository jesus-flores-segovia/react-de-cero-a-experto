import { act } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import { TodoApp } from "../../../../components/08-useReducer/TodoApp";
import { todos } from "../fixtures/todos";

describe("Tests inside file 'TodoApp.test.js'", () => {
    
    const wrapper = shallow(<TodoApp/>)

    Storage.prototype.setItem = jest.fn(() => {});

    test("'TodoApp' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("'TodoApp' component must add two new todos", () => {
        const wrapper = mount(<TodoApp/>);

        act(() => {
            wrapper.find("TodoAdd").prop("handleAdd")(todos[0].desc);
            wrapper.find("TodoAdd").prop("handleAdd")(todos[1].desc);
        });

        expect(wrapper.find("h1").text()).toBe("TodoApp ( 2 )");
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

})
