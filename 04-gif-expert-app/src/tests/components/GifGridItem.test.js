import { GifGridItem } from "../../components/GifGridItem";
import { shallow } from "enzyme";
import { toHaveClass } from '@testing-library/jest-dom'

describe("Tests inside file GifGridItem.test.js", () => {

    const gifGridItemProps = {
        id: "26BRzozg4TCBXv6QU",
        title: "Flying Harry Potter GIF by The Story Room",
        url: "https://media2.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif?cid=cc01726bdlkfuc1159oizzekhpham5is3gzwae4myiqeygw2&rid=giphy.gif&ct=g"
    };
    
    let wrapper = shallow(<GifGridItem {...gifGridItemProps}></GifGridItem>);

    beforeEach(() => {
        wrapper = shallow(<GifGridItem {...gifGridItemProps}></GifGridItem>);
    });

    test("'GifGridItem' component must show correctly", () => {

        expect(wrapper).toMatchSnapshot();
    });

    test("'GifGridItem' component must have a title", () => {

        const p = wrapper.find("p");

        expect(p.text()).toBe(gifGridItemProps.title);
    });

    test("'GifGridItem' component must have a html img tag", () => {

        const img = wrapper.find("img");

        expect(img.exists()).toBe(true);
    });

    test("'GifGridItem' component must have a html img tag including src attribute", () => {

        const img = wrapper.find("img");
        const src = img.prop("src");

        expect(src).toBe(gifGridItemProps.url);
    });

    test("'GifGridItem' component must have a html img tag including alt attribute", () => {

        const img = wrapper.find("img");
        const alt = img.prop("alt");

        expect(alt).toBe(gifGridItemProps.title);    
    });

    test("'GifGridItem' component must have a html div tag configured with a CSS animation attribute values as these: 'animate__animated animate__fadeInLeft'", () => {

        const div = wrapper.find("div");

        expect(div.hasClass("animate__animated animate__fadeInLeft")).toBe(true);
    });

});