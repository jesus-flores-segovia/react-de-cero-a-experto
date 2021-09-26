import { mount } from "enzyme";
import { UserContext } from "../../../components/09-useContext/UserContext";
import { AppRouter } from "../../../components/09-useContext/AppRouter";

describe("Tests inside file 'AppRouter.test.js'", () => {

    const setUser = jest.fn();

    const user = {
        email: "floressegoviajesus@gmail.com",
        password: "12345"
    };

    const wrapper = mount(
        <UserContext.Provider value={{user, setUser}}>
            <AppRouter/>
        </UserContext.Provider>
    );

    test("'AppRouter' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

});