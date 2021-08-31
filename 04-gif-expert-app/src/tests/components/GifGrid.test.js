import { shallow } from "enzyme";
import { GifGrid } from "../../components/GifGrid";
import "@testing-library/jest-dom";
import { useFetchGifs } from "../../hooks/useFetchGifs";
jest.mock("../../hooks/useFetchGifs");

describe("Tests inside file GifGrid.test.js", () => {

    const category = "Dragon Ball";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("'GifGrid' component must show correctly", () => {
        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        });

        const wrapper = shallow(<GifGrid category={category}></GifGrid>);
        expect(wrapper).toMatchSnapshot();
    });

    test("'GifGrid' component must show items obtained from useFetchGifs custom hook", () => {
        const gifs = [
            {
                id: "aAbax5anloMNk6TSP9",
                url: "https://giphy.com/gifs/TOEIAnimationUK-goku-super-saiyan-ultra-instinct-aAbax5anloMNk6TSP9",
                title: "Dragon Ball GIF by TOEI Animation UK"
            }
        ];

        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        });

        const wrapper = shallow(<GifGrid category={category}></GifGrid>);
        expect(wrapper.find("p").exists()).toBe(false);
        expect(wrapper.find("GifGridItem").length).toBe(gifs.length);
    });
});