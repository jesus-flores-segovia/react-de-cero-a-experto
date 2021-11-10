const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router");
const { PrivateRoute } = require("../../routers/PrivateRoute")

describe("Tests inside file 'PrivateRoute.test.js'", () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();

    test("Must shows the component if the user is authenticated and save the last path value in the local storage", () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>My component</span>}
                    {...props}
                />
            </MemoryRouter>
        )

        expect(wrapper.find('span').exists()).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
    })

    test("Must not show the component if the user isn't authenticated", () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() => <span>My component</span>}
                    {...props}
                />
            </MemoryRouter>
        )

        expect(wrapper.find('span').exists()).toBeFalsy();
    })
})