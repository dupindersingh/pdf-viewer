import {
    CHANGE_LOGIN_FORM,
    GENERATE_QR_CODE_PAGE_LOADING,
    IP_ADDRESS_FAILURE,
    IP_ADDRESS_REQUEST,
    IP_ADDRESS_SUCCESS,
    LOGIN_ACCOUNT_FAILURE,
    LOGIN_ACCOUNT_REQUEST,
    LOGIN_ACCOUNT_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_ACCOUNT_REQUEST,
    LOGOUT_ACCOUNT_SUCCESS,
    LOGOUT_ACCOUNT_FAILURE,
    CLEAR_LOGOUT_API_RESPONSE,
    LOGOUT_SUCCESS,
    SAVE_QR_CODE,
    SEND_OTP_FAILURE,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    SWITCH_PHONE_TO_VERIFY_OTP
} from "../../types/account";

const initialState = {
    auth: {
        isAuthenticated: localStorage.getItem("id") ? true : false
    },
    phoneNumber: "",
    phoneNumberPageLoading: false,
    phoneNumberStatus: "",
    phoneNumberError: "",
    phoneNumberMessage: "",
    generateQrCode: "",
    generateQrCodePageLoading: false,
    generateQrCodeMsg: "",
    generateQrCodeStatus: "",
    scanQrCodePageLoading: false,
    scanQrCodeMsg: "",
    scanQrCodeStatus: "",
    otp: "",
    loginAccountError: "",
    loginAccountPageLoading: false,
    loginAccountStatus: "",
    loginAccountMessage: "",
    ipAddressPageLoading: false,
    ipAddress: "",
    ipAddressStatus: "",
    ipAddressError: "",
    logoutAccountPageLoading: false,
    logoutAccountStatus: "",
    logoutAccountError: "",
    logoutAccountMessage: "",
    switchPhoneToOtp: false
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case GENERATE_QR_CODE_PAGE_LOADING:
            return Object.assign({}, state, {
                generateQrCodePageLoading: action.status
            });
        case CHANGE_LOGIN_FORM:
            return Object.assign({}, state, {
                otp: action.newState.otp,
                phoneNumber: action.newState.phoneNumber,
                phoneNumberStatus: "",
                phoneNumberError: "",
                phoneNumberMessage: "",
                loginAccountStatus: "",
                loginAccountError: "",
                loginAccountMessage: ""
            });
        case SEND_OTP_REQUEST:
            return Object.assign({}, state, {
                phoneNumberPageLoading: true
            });
        case SEND_OTP_SUCCESS:
            if (!action.response.data.error) {
                return Object.assign({}, state, {
                    phoneNumberPageLoading: false,
                    phoneNumberStatus: 200,
                    phoneNumberError: false,
                    phoneNumberMessage: action.response.data.message
                });
            } else {
                return Object.assign({}, state, {
                    phoneNumberPageLoading: false,
                    phoneNumberStatus: 200,
                    phoneNumberError: true,
                    phoneNumberMessage: action.response.data.message
                });
            }
        case SEND_OTP_FAILURE:
            return Object.assign({}, state, {
                phoneNumberPageLoading: false,
                phoneNumberStatus: action.response.status,
                phoneNumberError: true,
                phoneNumberMessage: action.response.data.message
            });
        case LOGIN_ACCOUNT_REQUEST:
            return Object.assign({}, state, {
                loginAccountPageLoading: true
            });
        case LOGIN_ACCOUNT_SUCCESS:
            console.log(action.response.data, "dataaaaaaaaaaaaaaaaa");
            if (!action.response.data.error) {
                localStorage.setItem("id", action.response.data.user_id);
                localStorage.setItem("name", action.response.data.name);
                return Object.assign({}, state, {
                    loginAccountPageLoading: false,
                    loginAccountStatus: 200,
                    loginAccountError: false,
                    loginAccountMessage: action.response.data.message
                });
            } else {
                return Object.assign({}, state, {
                    loginAccountPageLoading: false,
                    loginAccountStatus: 200,
                    loginAccountError: true,
                    loginAccountMessage: action.response.data.message
                });
            }
        case LOGIN_ACCOUNT_FAILURE:
            console.log("")
            return Object.assign({}, state, {
                loginAccountPageLoading: false,
                loginAccountStatus: action.response.status,
                loginAccountError: true,
                loginAccountMessage: action.response.data.message
            });
        case SAVE_QR_CODE:
            return Object.assign({}, state, {
                generateQrCode: action.qr
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                auth: {
                    isAuthenticated: true
                }
            });
        case LOGOUT_SUCCESS:
            localStorage.clear();
            return Object.assign({}, state, {
                auth: {
                    isAuthenticated: false
                }
            });
        case SWITCH_PHONE_TO_VERIFY_OTP:
            return Object.assign({}, state, {
                switchPhoneToOtp: action.status
            });
        case IP_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                ipAddressPageLoading: true
            });
        case IP_ADDRESS_SUCCESS:
            if (!action.response.data.error) {
                return Object.assign({}, state, {
                    ipAddressPageLoading: false,
                    ipAddress: action.response.data.ip,
                    ipAddressStatus: 200,
                    ipAddressError: false
                });
            } else {
                return Object.assign({}, state, {
                    ipAddressPageLoading: false,
                    ipAddress: "",
                    ipAddressStatus: 200,
                    ipAddressError: true
                });
            }
        case IP_ADDRESS_FAILURE:
            return Object.assign({}, state, {
                ipAddressPageLoading: false,
                ipAddress: "",
                ipAddressStatus: action.response.status,
                ipAddressError: true
            });


        case LOGOUT_ACCOUNT_REQUEST:
            return Object.assign({}, state, {
                logoutAccountPageLoading: true
            });
        case LOGOUT_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                logoutAccountPageLoading: false,
                logoutAccountStatus: 200,
                logoutAccountError: action.response.data.error,
                logoutAccountMessage: action.response.data.message
            });
        case LOGOUT_ACCOUNT_FAILURE:
            return Object.assign({}, state, {
                logoutAccountPageLoading: false,
                logoutAccountStatus: action.response.status,
                logoutAccountError: true,
                logoutAccountMessage: action.response.data.message
            });
        case
        CLEAR_LOGOUT_API_RESPONSE:
            return Object.assign({}, state, {
                logoutAccountStatus: "",
                logoutAccountError: "",
                logoutAccountMessage: ""
            });
        default:
            return state
    }
}