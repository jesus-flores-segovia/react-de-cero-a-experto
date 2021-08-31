import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";
import "@testing-library/jest-dom";

describe("Tests inside file AddCategory.test.js", () => {

    const setCategories = jest.fn();
    let wrapper = shallow(<AddCategory setCategories={setCategories}></AddCategory>);

    //We use this lifecycle function to restart the component in every test, in addition we restart all mocked values on every function
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallow(<AddCategory setCategories={setCategories}></AddCategory>);
    });

    test("'AddCategory' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("'AddCategory' component onChange event, must change his input value", () => {
        const value = "Testing onChange event";
        
        let input = wrapper.find("input");
        input.simulate("change", {target: {value}})

        input = wrapper.find("input");
        expect(input.prop("value")).toBe(value);
    });

    test("'AddCategory' component onSubmit event, doesn't change the categories state, because length isn't longer enough", () => {
        const form = wrapper.find("form");
        form.simulate("submit", {preventDefault(){}})
        expect(setCategories).not.toHaveBeenCalled();
    });

    test("'AddCategory' component onSubmit event, change the categories state and input value must be empty", () => {
        const value = "Testing onChange event";
        
        let input = wrapper.find("input");
        input.simulate("change", {target: {value}})

        const form = wrapper.find("form");
        form.simulate("submit", {preventDefault(){}})

        expect(setCategories).toHaveBeenCalled();

        input = wrapper.find("input");
        expect(input.prop("value")).toBe("");
    });
});