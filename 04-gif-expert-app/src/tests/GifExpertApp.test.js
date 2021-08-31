import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import {GifExpertApp} from "../GifExpertApp";

describe("Tests inside file GifExpertApp.test.js", () => {

    test("'GifExpertApp' component must show correctly", () => {
        const wrapper = shallow(<GifExpertApp></GifExpertApp>)
        expect(wrapper).toMatchSnapshot();
    });

    test("'GifExpertApp' component must show a list of categories", () => {
        const categories = ["Dragon Ball", "One Punch"];
        const wrapper = shallow(<GifExpertApp defaultCategories={categories}></GifExpertApp>)
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("GifGrid").length).toBe(categories.length);
    });
});