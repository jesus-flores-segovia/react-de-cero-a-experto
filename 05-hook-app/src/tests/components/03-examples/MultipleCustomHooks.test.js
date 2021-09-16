import {act, renderHook} from "@testing-library/react-hooks";
import { shallow } from "enzyme";
import {MultipleCustomHooks} from "../../../components/03-examples/MultipleCustomHooks";
import { useFetch } from "../../../hooks/useFetch";
import { useCounter } from "../../../hooks/useCounter";

jest.mock("../../../hooks/useFetch");
jest.mock("../../../hooks/useCounter");

describe("Tests inside file MultipleCustomHooks.test.js", () => {

    test("'MultipleCustomHooks' component must show correctly", () => {

        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null
        });

        useCounter.mockReturnValue({
            counter: 1,
            increment: jest.fn(),
            reset: jest.fn()
        });

        const wrapper = shallow(<MultipleCustomHooks/>)
        
        expect(wrapper).toMatchSnapshot();
    });

    test("'MultipleCustomHooks' component must show the retrieved information", () => {
        
        useFetch.mockReturnValue({
            data: [{
                author: "Jesús",
                quote: "This is an example quote."
            }],
            loading: false,
            error: null
        });

        useCounter.mockReturnValue({
            counter: 1,
            increment: jest.fn(),
            reset: jest.fn()
        });

        const wrapper = shallow(<MultipleCustomHooks/>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert").exists()).toBe(false);
        expect(wrapper.find(".mb-3").text().trim()).toBe("This is an example quote.");
        expect(wrapper.find("footer").text().trim()).toBe("Jesús");


    });
});