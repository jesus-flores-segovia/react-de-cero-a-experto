import { shallow } from "enzyme";
import { TodoAdd } from "../../../../components/08-useReducer/components/TodoAdd";

describe("Tests inside file 'TodoAdd.test.js'", () => {

    const handleAddTodo = jest.fn();
    
    const wrapper = shallow(
        <TodoAdd
            handleAdd={handleAddTodo}
        />
    );

    test("'TodoAdd' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("'TodoAdd' component should not call handleAddTodo function when we submit the form", () => {
        const formSubmit = wrapper.find("form").prop("onSubmit");

        formSubmit({preventDefault(){}});

        expect(handleAddTodo).toHaveBeenCalledTimes(0);
    });

    test("'TodoAdd' component should call handleAddTodo function when we submit the form", () => {
        const formInput = wrapper.find("input");
        const value = "Learn React";

        formInput.simulate("change", {
            target: {
                value,
                name: "description"
            }
        });

        const formSubmit = wrapper.find("form").prop("onSubmit");
        formSubmit({preventDefault(){}});

        expect(handleAddTodo).toHaveBeenCalledTimes(1);
    });

    test("'TodoAdd' component should be call handleAddTodo function with the correct function parameters", () => {
        const formInput = wrapper.find("input");
        const value = "Learn React";

        formInput.simulate("change", {
            target: {
                value,
                name: "description"
            }
        });

        const formSubmit = wrapper.find("form").prop("onSubmit");
        formSubmit({preventDefault(){}});

        expect(handleAddTodo).toHaveBeenCalledWith(expect.any(String));
    });

    test("'TodoAdd' component should have the input value as empty once the onSubmit event was fired", () => {
        const formInput = wrapper.find("input");
        const value = "Learn React";

        formInput.simulate("change", {
            target: {
                value,
                name: "description"
            }
        });

        const formSubmit = wrapper.find("form").prop("onSubmit");
        formSubmit({preventDefault(){}});

        const formInputValue = wrapper.find("input").prop("value");

        expect(formInputValue).toBe("");
    });
})
