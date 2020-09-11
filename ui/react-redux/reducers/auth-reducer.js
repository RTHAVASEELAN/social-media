import { USER_AUTHENTICATED } from '../ActionType/Action';
import { USER_AUTHENTICATED_REMOVE } from '../ActionType/Action';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const isUserLoggedIn = cookies.get('isUserLoggedIn');
const email = cookies.get('email');

const initialState = {
    isUserAuthenticated: isUserLoggedIn === "true" ? true : false,
    sendEmail: email
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHENTICATED:
            const { sendEmail } = action;

            cookies.set("isUserLoggedIn", "true")
            cookies.set("email", sendEmail);

            return {
                ...state,
                isUserAuthenticated: true,
                sendEmail: sendEmail
            };

        case USER_AUTHENTICATED_REMOVE:
            return {
                ...state,
                resData: action.resLogoutData,
                isUserAuthenticated: false,
                sendEmail: ''
            };

        default:
            return state;

    }
}

export default authReducer;

