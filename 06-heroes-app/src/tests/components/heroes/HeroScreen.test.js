import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { HeroScreen } from "../../../components/heroes/HeroScreen"

describe("Tests inside file 'HeroScreen.test.js'", () => {

    const history = {
        length: 0,
        push: jest.fn(),
        goBack: jest.fn(),
    };

    test("HeroScreen component must be shown as empty because it have not a valid hero url and redirects to the login screen", () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <HeroScreen history={history}/>
            </MemoryRouter>
        );

        expect(wrapper.find("Redirect").exists()).toBeTruthy();
    })

    test("HeroScreen component must be shown a hero if the url parameter exists and it's found", () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".row").exists()).toBeTruthy();

    })

    test("HeroScreen component must return to the login page when press the 'Go back' button if the user access to the hero screen between the directly url", () => {
        
        const history = {
            length: 2,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path="/hero/:heroId" component={() => <HeroScreen history={history}/>} />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();
        expect(history.push).toBeCalledTimes(1);
        expect(history.push).toBeCalledWith("/");
        expect(history.goBack).not.toBeCalled();

    })

    test("HeroScreen component must return to the hero card list screen when press the 'Go back' button if the user complete the full hero journey", () => {
        
        const history = {
            length: 3,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path="/hero/:heroId" component={() => <HeroScreen history={history}/>} />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();
        expect(history.goBack).toBeCalledTimes(1);
        expect(history.push).not.toBeCalled();

    })

    test("HeroScreen component must be shown as empty because it have not a valid hero id url and redirects to the login screen", () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider-not-exists"]}>
                <Route path="/hero/:heroId" component={() => <HeroScreen history={history}/>} />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe("");
    })
})