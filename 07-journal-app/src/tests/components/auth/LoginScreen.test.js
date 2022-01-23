import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const user = {
    email: "floressegoviajesus@gmail.com",
    password: "123456"
};

jest.mock('../../../hooks/useForm', () => ({
    useForm: jest.fn().mockReturnValue([user, jest.fn(), jest.fn()])
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
);

describe("Tests inside file 'LoginScreen.test.js'", () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test("'LoginScreen' must be shown correctly", () => {
        expect(wrapper).toMatchSnapshot();
    })

    test("The login button must fire the 'handleLogin' event and 'startLoginEmailPassword' action", () => {
        
        const form = wrapper.find("form");

        form.simulate("submit");

        expect(startLoginEmailPassword).toHaveBeenCalledWith(user.email, user.password);
    })

    test("The Google login button must fire the 'handleGoogleLogin' event and 'startGoogleLogin' action", () => {
        const googleLoginButton = wrapper.find(".google-btn");

        googleLoginButton.prop("onClick")();

        expect(startGoogleLogin).toHaveBeenCalled();
    })
})