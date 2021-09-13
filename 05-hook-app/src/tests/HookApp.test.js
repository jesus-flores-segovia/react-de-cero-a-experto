import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import {HookApp} from "../HookApp";

describe("Tests inside file HookApp.test.js", () => {

    test("'HookApp' component must show correctly", () => {
        const wrapper = shallow(<HookApp></HookApp>)
        expect(wrapper).toMatchSnapshot();
    });

});