import axios from "axios";
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



  export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
  
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
  
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
  
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
                console.log('Logeado!!!!', res.data)
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
  };

export const login = (email, password) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING
  })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    email,
    password
  })


  const route = 'auth/jwt/create/'

  try {
    console.log('body', body)
    console.log('URL', `${process.env.REACT_APP_API_URL}/${route}`)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/${route}`, body, config)

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

export const check_authenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({
      token: localStorage.getItem('access')
    })

    const route = 'auth/jwt/verify/'

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${route}`, body, config)
      console.log(`${process.env.REACT_APP_API_URL}/${route}`)

      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        })
      }
      else {
        dispatch({
          type: AUTHENTICATED_FAIL
        })
      }
    }
    catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL
      })
    }

  }
  else {
    dispatch({
      type: AUTHENTICATED_FAIL
    })
  }
}

export const refresh = () => async dispatch => {
  if (localStorage.getItem('refresh')) {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({
      refresh: localStorage.getItem('refresh')
    })

    const route = 'auth/jwt/refresh/'

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${route}`, body, config)
      console.log(`${process.env.REACT_APP_API_URL}/${route}`)

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
        })
      }
      else {
        dispatch({
          type: REFRESH_FAIL
        })
      }
    }
    catch (err) {
      dispatch({
        type: REFRESH_FAIL
      })
    }

  }
  else {
    dispatch({
      type: REFRESH_FAIL
    })
  }
}

export const reset_password = (email) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    email
  })

  const route = 'auth/jwt/reset_password/'

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/${route}`, body, config)
    console.log(`${process.env.REACT_APP_API_URL}/${route}`)

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

  dispatch({
    type: SET_AUTH_LOADING,
  })


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

  if (new_password !== re_new_password) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FAIL,
    })
    dispatch({
      type: REMOVE_AUTH_LOADING,
    })
  }
  else {

    const route = 'auth/jwt/reset_password_confirm/'

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${route}`, body, config)
      console.log(`${process.env.REACT_APP_API_URL}/${route}`)

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
