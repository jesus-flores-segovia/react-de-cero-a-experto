import React from "react";
import CounterApp from "../CounterApp";
import {shallow} from "enzyme";
import "@testing-library/jest-dom";

describe("Tests inside file CounterApp.test.js", () =>{

    // That's not a good practice, but if we initialize this, we can acces to the Intellij information
    let wrapper = shallow(<CounterApp></CounterApp>);

    beforeEach(() => {
        wrapper = shallow(<CounterApp></CounterApp>);
    });

    test("'CounterApp' component must show correctly", () =>{

        expect(wrapper).toMatchSnapshot();
    });

    test("'CounterApp' component must contains the counter state configured by the prop value", () =>{

        const counter = 100;
        const wrapper = shallow(<CounterApp value={counter}></CounterApp>);
        console.log(wrapper.html());

        const counterText = wrapper.find("h2").text();

        expect(counterText).toBe("100")
    });

    test("'CounterApp' add button must increment the counter value", () =>{
        
        const addButton = wrapper.find("button").at(2);
        console.log(addButton.html());

        addButton.simulate("click");

        const counterText = wrapper.find("h2").text();
        expect(counterText).toBe("1")
    });

    test("'CounterApp' substract button must decrease the counter value", () =>{

        const substractButton = wrapper.find("button").at(0);
        console.log(substractButton.html());

        substractButton.simulate("click");

        const counterText = wrapper.find("h2").text();
        expect(counterText).toBe("-1")      
    });

    test("'CounterApp' reset button must re-configure the counter value to 0", () =>{

        const counter = 100;
        const wrapper = shallow(<CounterApp value={counter}></CounterApp>);

        const resetButton = wrapper.find("button").at(1);
        console.log(resetButton.html());

        resetButton.simulate("click");

        const counterText = wrapper.find("h2").text();
        expect(counterText).toBe("100")      
    });
});