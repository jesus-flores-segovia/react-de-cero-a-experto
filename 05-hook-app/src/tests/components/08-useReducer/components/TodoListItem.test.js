import { shallow } from "enzyme";
import { TodoListItem } from "../../../../components/08-useReducer/components/TodoListItem";
import { todos } from "../fixtures/todos";

describe("Tests inside file TodoListItem.test.js", () => {

    const handleDelete = jest.fn();
    const handleToggle = jest.fn();
    const wrapper = shallow(<TodoListItem todo={todos[0]} index={0} handleDelete={handleDelete} handleToggle={handleToggle}/>)

    test("'TodoListItem' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("p").text()).toBe(`1. ${todos[0].desc}`);
        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").text()).toBe("Remove");
    });

    test("'TodoListItem' component must call the handleDelete onClick function", () => {
        const button = wrapper.find("button");
        button.simulate("click");

        expect(handleDelete).toHaveBeenCalledWith(todos[0].id);
    });

    test("'TodoListItem' component must call the handleToggle onClick function", () => {
        const p = wrapper.find("p");

        p.simulate("click");

        expect(handleToggle).toHaveBeenCalledWith(todos[0].id);
    });

    test("'TodoListItem' component must show the todo marked as completed", () => {
        const p = wrapper.find("p");

        expect(p.hasClass("complete")).toBeTruthy();
    });
});