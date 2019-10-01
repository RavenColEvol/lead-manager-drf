import axios from 'axios'
import {USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,REGISTER_FAIL,REGISTER_SUCCESS} from './types';
import {createMessage, returnErrors} from './messages';


export const loadUser = () => (dispatch,getState) =>{
    dispatch({type:USER_LOADING});

    const config = tokenConfig(getState);

    axios.get('/api/auth/user',config)
    .then(res=>{
        dispatch({
            type:USER_LOADED,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status));
        dispatch({type:AUTH_ERROR});
    })
}


export const login = (username,password) => dispatch =>{
   

    // headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

   const body = JSON.stringify({username,password});

    axios.post('/api/auth/login',body, config)
    .then(res=>{
        dispatch(createMessage({loginSuccessful:'Login was Successful'}));
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status));
        dispatch({type:LOGIN_FAIL});
    })
}


export const logout = () => (dispatch,getState) =>{
   
    const config = tokenConfig(getState);

    axios.post('/api/auth/logout',null, config)
    .then(res=>{
        dispatch(createMessage({logoutSuccessful:'Logout Successfully'}));
        dispatch({
            type:LOGOUT_SUCCESS,
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status));
    })
}


export const tokenConfig = getState => {
    // get token
    const token = getState().auth.token;

    // headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}


export const register = ({username,password,email}) => dispatch =>{
   
    // headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

   const body = JSON.stringify({username,password,email});

    axios.post('/api/auth/register',body, config)
    .then(res=>{
        dispatch(createMessage({accountCreated:'Registration was successful'}));
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data,
            err.response.status));
        dispatch({type:REGISTER_FAIL});
    })
}