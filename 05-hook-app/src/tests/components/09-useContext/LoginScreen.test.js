import * as React from 'react';
import { mount } from "enzyme";
import { UserContext } from "../../../components/09-useContext/UserContext";
import { LoginScreen } from "../../../components/09-useContext/LoginScreen";

const setUser = jest.fn();

const user = {
    email: "floressegoviajesus@gmail.com",
    password: "12345"
};

describe("Tests inside file 'LoginScreen.test.js'", () => {

    const wrapper = mount(
        <UserContext.Provider value={{setUser}}>
            <LoginScreen/>
        </UserContext.Provider>
    );

    test("'LoginScreen' component must show correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("'LoginScreen' component must fire the onClick event and set the user information correctly", () => {

        const inputEmail = wrapper.find("#inputEmail");
        const inputPassword = wrapper.find("#inputPassword");
        const form = wrapper.find("form");

        inputEmail.simulate("change", {
            target: {
                value: user.email,
                name: "email"
            }
        });

        inputPassword.simulate("change", {
            target: {
                value: user.password,
                name: "password"
            }
        });

        form.simulate("submit");
        expect(setUser).toHaveBeenCalledTimes(1);
        expect(setUser).toBeCalledWith(user);
    });
});