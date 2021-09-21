import React from 'react';
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import {RealUseCase} from "../../../components/04-useRef/RealUseCase";

describe("Tests inside file RealUseCase.test.js", () => {

    test("'RealUseCase' component must show correctly", () => {
        const wrapper = shallow(<RealUseCase/>)
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("MultipleCustomHooks").exists()).toBe(false);
    });

    test("'RealUseCase' component must show 'MultipleCustomHooks' component", () => {
        const wrapper = shallow(<RealUseCase/>)

        wrapper.find("button").simulate("click");

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("MultipleCustomHooks").exists()).toBe(true);
    });
});