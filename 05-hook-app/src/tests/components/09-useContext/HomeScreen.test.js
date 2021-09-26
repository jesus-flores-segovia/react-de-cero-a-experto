import { mount } from "enzyme";
import { HomeScreen } from "../../../components/09-useContext/HomeScreen";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("Tests inside file 'HomeScreen.test.js'", () => {
    
    const user = {
        name: "Jesús Flores Segovia",
        email: "jesus@gmail.com"
    }

    const wrapper = mount(
    <UserContext.Provider value={{
        user
    }}>
        <HomeScreen/>
    </UserContext.Provider>
    )

    test("'HomeScreen' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
});