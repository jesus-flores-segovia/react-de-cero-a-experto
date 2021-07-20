import { GifGridItem } from "../components/GifGridItem";
import { shallow } from "enzyme";

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
});