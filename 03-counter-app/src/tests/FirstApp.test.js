import React from "react";
import FirstApp from "../FirstApp";
import {shallow} from "enzyme";
import "@testing-library/jest-dom";

describe("Tests inside file FirstApp.test.js", () =>{
    /* test("'FirstApp' component must show the prop greetings 'Hello, I'm Jesús Flores'", () =>{

        const greetings = "Hello, I'm Jesús Flores";
        const {getByText} = render(<FirstApp greetings={greetings} greetings2={greetings}></FirstApp>);
        console.log(getByText);
        console.log(getByText(greetings));
        //console.log(getByText("Invented"));

        expect(getByText(greetings)).toBeInTheDocument();
    }); */

    test("'FirstApp' component must show correctly", () =>{

        const greetings = "Hello, I'm Jesús Flores";
        const wrapper = shallow(<FirstApp greetings={greetings}></FirstApp>);

        expect(wrapper).toMatchSnapshot();
    });

    test("'FirstApp' component must show the subtitle passed by the prop value", () =>{

        const greetings = "Hello, I'm Jesús Flores";
        const subtitle = "This is a default subtitle";
        const wrapper = shallow(<FirstApp greetings={greetings} subtitle={subtitle}></FirstApp>);

        const subtitleText = wrapper.find("p").text();

        expect(subtitleText).toBe(subtitle);
    });
});