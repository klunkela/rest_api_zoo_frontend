import {loginAPI} from "../api/api";

const SET_ME = 'SET_ME'

let initialState = {
    id: null,
    login: null,
    token: null,
    access_level: 1,
    isAuth: false
}

const me_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ME: {
            return {
                ...state,
                ...action.data
            }
        }
        default: {
            return state;
        }
    }
}

export let setMe_ = (token, id, login, access_level, isAuth) => {
    if (isAuth) {
        console.log(token);
        setCookie('token', token, {secure: true, 'max-age': 3600})
    } else {
        deleteCookie('token')
    }
    return {type: SET_ME, data: {token, id, login, access_level, isAuth}}
}

export const setMe = (login, password) => {
    return (dispatch) => {
        loginAPI.checkUserInDB(login, password).then(res => {
            if (res.status === 200) {
                dispatch(setMe_(res.data.token, res.data.user.id, login, res.data.user.access_level, true))
            }
            else {
                alert(res.response.data.message)
            }

        })
    }
}

export const setMeToken = (token) => {
    return async dispatch => {
        loginAPI.reLog(token).then(res => {
            dispatch(setMe_(res.data.token, res.data.user.id, res.data.user.login, res.data.user.access_level, true))
        })
    }
}

export const regUser = (login, password) => {
    return (dispatch) => {
        loginAPI.regUser(login, password).then(res => {
                if (res.status === 200) {
                    dispatch(setMe_(res.data.token, res.data.id, login, res.data.access_level, true))
                    alert("Вы успешно зарегистрировались")
                }
            }
        )
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(setMe_(null, null, null, false))
    }
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export default me_reducer
