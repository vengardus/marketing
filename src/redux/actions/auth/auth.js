import axios from "axios";
import { do_dispatch, get_axios, post_axios } from "../../../mylib/axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGOUT,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
}
  from './types'


export const load_user = () => {
  if (localStorage.getItem('access') === null)
    return do_dispatch(USER_LOADED_FAIL);

  const api_url = `${process.env.REACT_APP_API_URL}/auth/users/me/`
  const config = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
    // 'JWT' en Authorization tiene ese valor porque asi está definido en
    // el back-end en settings: 
    // SIMPLE_JWT = {
    //    'AUTH_HEADER_TYPES': ('JWT', ),
  };

  return get_axios(api_url, config, USER_LOADED_SUCCESS, USER_LOADED_FAIL)
};

export const login = (email, password) => async dispatch => {
  const api_url = `${process.env.REACT_APP_API_URL}/auth/jwt/create/`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    email,
    password
  })
  
  dispatch({
    type: SET_AUTH_LOADING
  })

  try {
    const res = await axios.post(api_url, body, config)

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      dispatch(load_user())

      dispatch({
        type: REMOVE_AUTH_LOADING,
      })
    }
    else {
      dispatch({
        type: LOGIN_FAIL
      })
      dispatch({
        type: REMOVE_AUTH_LOADING,
      })
    }
  }
  catch (err) {
    dispatch({
      type: LOGIN_FAIL
    })
    dispatch({
      type: REMOVE_AUTH_LOADING,
    })
  }
}

export const check_authenticated = () => {
  if (localStorage.getItem('access') === null)
    return do_dispatch(AUTHENTICATED_FAIL)

  const api_url = `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    token: localStorage.getItem('access')
  })

  return post_axios(api_url, body, config, AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL )

}


export const refresh = () => {
  if (localStorage.getItem('refresh') === null)
    return do_dispatch(REFRESH_FAIL)

  const api_url = `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    refresh: localStorage.getItem('refresh')
  })

  return post_axios(api_url, body, config, REFRESH_SUCCESS, REFRESH_FAIL)
}

export const reset_password = (email) => async dispatch => {
  const api_url = `${process.env.REACT_APP_API_URL}/auth/jwt/reset_password/`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    email
  })

  try {
    const res = await axios.post(api_url, body, config)

    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      })
      dispatch({
        type: REMOVE_AUTH_LOADING,
      })

    }
    else {
      dispatch({
        type: RESET_PASSWORD_FAIL
      })
      dispatch({
        type: REMOVE_AUTH_LOADING
      })
    }
  }
  catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL
    })
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const api_url = `${process.env.REACT_APP_API_URL}/auth/jwt/reset_password_confirm/`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    uid,
    token,
    new_password,
    re_new_password
  })

  dispatch({
    type: SET_AUTH_LOADING,
  })

  if (new_password !== re_new_password) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FAIL,
    })
    dispatch({
      type: REMOVE_AUTH_LOADING,
    })
  }
  else {
    try {
      const res = await axios.post(api_url, body, config)

      if (res.status === 204) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_SUCCESS,
        })
        dispatch({
          type: REMOVE_AUTH_LOADING,
        })

      }
      else {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL
        })
        dispatch({
          type: REMOVE_AUTH_LOADING
        })
      }
    }
    catch (err) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL
      })
      dispatch({
        type: REMOVE_AUTH_LOADING
      })
    }
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
