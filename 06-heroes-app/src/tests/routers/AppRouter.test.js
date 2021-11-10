import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext"
import { AppRouter } from "../../routers/AppRouter"

describe("Tests inside file 'AppRouter.test.js'", () => {

    test("Must show the login if the user isn't authenticated", () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("h1").text()).toBe("Login");
    })

    test("Must show the marvel page if the user is authenticated", () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name:"Jesús"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        )
        
        expect(wrapper.find(".navbar").exists()).toBeTruthy();
    })
})