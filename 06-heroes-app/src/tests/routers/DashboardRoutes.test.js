import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { DashboardRoutes } from "../../routers/DashboardRoutes"
import { AuthContext } from "../../auth/AuthContext"

describe("Tests inside file 'DashboardRoutes.test.js'", () => {

    test("DashboardRoutes must be shown correctly", () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name:"Jesús"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>  
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe("You're logged as Jesús");
    })
})