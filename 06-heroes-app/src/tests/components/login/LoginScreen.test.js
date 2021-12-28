import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen"

describe("Tests inside file 'LoginScreen.test.js'", () => {

    const history = {
        replace: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name:"Jesús"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
    });

    test("LoginScreen component must be shown correctly", () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history}/>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("h1").text().trim()).toBe("Login")
    })

    test("LoginScreen component must log the user when the login button is clicked", () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history}/>
            </AuthContext.Provider>
        );

        wrapper.find("button").prop("onClick")();
        expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
        expect(contextValue.dispatch).toHaveBeenCalledWith({payload: "Jesús", type: "[auth] login"})
        expect(history.replace).toHaveBeenCalledTimes(1);
        expect(history.replace).toHaveBeenCalledWith('/');
    })

    test("LoginScreen component must retrieve the last path saved in the local storage", () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history}/>
            </AuthContext.Provider>
        );

        localStorage.setItem("lastPath", "/dc");

        wrapper.find("button").prop("onClick")();
        expect(history.replace).toHaveBeenCalledTimes(1);
        expect(history.replace).toHaveBeenCalledWith('/dc');
    })
})