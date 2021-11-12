import { mount } from "enzyme"
import { MemoryRouter, Router } from "react-router"
import { AuthContext } from "../../../auth/AuthContext"
import { Navbar } from "../../../components/ui/NavBar"

describe("Tests inside file 'NavBar.test.js'", () => {

    const history = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name:"Jesús",
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={history}>
                    <Navbar/>
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>  
    );

    afterEach(() => {
        jest.clearAllMocks();
    })

    test("NavBar component must be shown correctly", () => {
        

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe("You're logged as Jesús");
    })

    test("NavBar component must call the logout function using the history API", () => {
        
        wrapper.find(".btn-danger").prop("onClick")();
        expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
        expect(contextValue.dispatch).toHaveBeenCalledWith(
            {
                "type": "[auth] logout",
            });
        expect(history.replace).toHaveBeenCalledWith("/login");
    })
})