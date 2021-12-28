import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { SearchScreen } from "../../../components/search/SearchScreen"

describe("Tests inside file 'SearchScreen.test.js'", () => {

    test("SearchScreen component must be shown correctly", () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("h1").text()).toBe("SearchScreen");
    })

    test("Must show a hero result when a query param is setted", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("h5").text()).toBe("Batman");
        expect(wrapper.find("input").prop("value")).toBe("batman");
    })

    test("Must show an alert that advice the user that there are not results for his search", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman1"]}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert.alert-danger p").text().trim()).toBe("There are not results for 'batman1'. Please try again.")
    })

    test("Must calls the push function from history and rewrite the url with the new query param", () => {
        const history = {
            push: jest.fn()
        };
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={() => <SearchScreen history={history}/>}/>
            </MemoryRouter>
        );

        wrapper.find("input").simulate("change", {
            target: {
                name: "query",
                value: "batman"
            }
        });

        wrapper.find("form").prop("onSubmit")({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith("?q=batman");
    })
})