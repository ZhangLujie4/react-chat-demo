import Axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    // isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: '',
    code: 1
}
// reducer
export function user(state = initState, action) {
    switch (action.type) {
        // case REGISTER_SUCCESS:
        //     return {...state, redirectTo: getRedirectPath(action.payload), isAuth: true, msg: '', ...action.payload}
        // case LOGIN_SUCCESS:
        //     return {...state, redirectTo: getRedirectPath(action.payload), isAuth: true, msg: '', ...action.payload}
        case AUTH_SUCCESS:
            return {...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state
    }
}

function errorMsg(content) {

    return {type: ERROR_MSG, msg: content}
}

// 过滤pwd
// function authSuccess(obj) {
//     const {pwd, ...data} = obj
//     return {type: AUTH_SUCCESS, payload: data}
// }
function authSuccess(content){
    return {type: AUTH_SUCCESS, payload: content}
}
// function registerSuccess(content) {
//     return {type: REGISTER_SUCCESS, payload: content}
// }

// function loginSuccess(content) {
//     return {type: LOGIN_SUCCESS, payload: content}
// }

export function update(data) {
    return dispatch=>{
        Axios.post('/user/update', data)
        .then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function register({user, pwd, repeatPwd, type}) {
    if (!user||!pwd||!type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd!==repeatPwd) {
        return errorMsg('两次输入密码不一致')
    }
    return dispatch=>{
        Axios.post('/user/register', {
            user, pwd, type
        }).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function login({user, pwd}) {
    if (!user||!pwd) {
        return errorMsg('用户名和密码不能为空')
    }
    return dispatch=>{
        Axios.post('/user/login', {
            user, pwd
        }).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

export function logoutSubmit() {
    return {type: LOGOUT}
}