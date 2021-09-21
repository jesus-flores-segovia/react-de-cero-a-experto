import { shallow } from "enzyme";
import { TodoList } from "../../../../components/08-useReducer/components/TodoList";
import { todos } from "../fixtures/todos";

describe("Tests inside file TodoList.test.js", () => {

    const handleDelete = jest.fn();
    const handleToggle = jest.fn();
    const wrapper = shallow(<TodoList todos={todos} handleDelete={handleDelete} handleToggle={handleToggle}/>)

    test("'TodoList' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("'TodoList' component must render two TodoListItem components", () => {
        const todoListItems = wrapper.find("TodoListItem");

        expect(todoListItems.length).toBe(todos.length);
        expect(todoListItems.at(0).prop("handleDelete")).toEqual(expect.any(Function));
        expect(todoListItems.at(0).prop("handleToggle")).toEqual(expect.any(Function));
        expect(todoListItems.at(0).prop("index")).toBe(0);
        expect(todoListItems.at(0).prop("todo")).toEqual(todos[0]);
    });
});