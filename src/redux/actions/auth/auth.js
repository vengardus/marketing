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
                console.log('Logeado!!!!')
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

export const login = (email, password) => async disptach => {
  disptach({
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
      disptach({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      disptach(load_user())

      disptach({
        type: REMOVE_AUTH_LOADING,
      })
    }
    else {
      disptach({
        type: LOGIN_FAIL
      })
      disptach({
        type: REMOVE_AUTH_LOADING,
      })
    }
  }
  catch (err) {
    disptach({
      type: LOGIN_FAIL
    })
    disptach({
      type: REMOVE_AUTH_LOADING,
    })
  }
}

export const check_authenticated = () => async disptach => {
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
        disptach({
          type: AUTHENTICATED_SUCCESS,
        })
      }
      else {
        disptach({
          type: AUTHENTICATED_FAIL
        })
      }
    }
    catch (err) {
      disptach({
        type: AUTHENTICATED_FAIL
      })
    }

  }
  else {
    disptach({
      type: AUTHENTICATED_FAIL
    })
  }
}

export const refresh = () => async disptach => {
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
        disptach({
          type: REFRESH_SUCCESS,
        })
      }
      else {
        disptach({
          type: REFRESH_FAIL
        })
      }
    }
    catch (err) {
      disptach({
        type: REFRESH_FAIL
      })
    }

  }
  else {
    disptach({
      type: REFRESH_FAIL
    })
  }
}

export const reset_password = (email) => async disptach => {

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
      disptach({
        type: RESET_PASSWORD_SUCCESS,
      })
      disptach({
        type: REMOVE_AUTH_LOADING,
      })

    }
    else {
      disptach({
        type: RESET_PASSWORD_FAIL
      })
      disptach({
        type: REMOVE_AUTH_LOADING
      })
    }
  }
  catch (err) {
    disptach({
      type: RESET_PASSWORD_FAIL
    })
    disptach({
      type: REMOVE_AUTH_LOADING
    })
  }


}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async disptach => {

  disptach({
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
    disptach({
      type: RESET_PASSWORD_CONFIRM_FAIL,
    })
    disptach({
      type: REMOVE_AUTH_LOADING,
    })
  }
  else {

    const route = 'auth/jwt/reset_password_confirm/'

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/${route}`, body, config)
      console.log(`${process.env.REACT_APP_API_URL}/${route}`)

      if (res.status === 204) {
        disptach({
          type: RESET_PASSWORD_CONFIRM_SUCCESS,
        })
        disptach({
          type: REMOVE_AUTH_LOADING,
        })

      }
      else {
        disptach({
          type: RESET_PASSWORD_CONFIRM_FAIL
        })
        disptach({
          type: REMOVE_AUTH_LOADING
        })
      }
    }
    catch (err) {
      disptach({
        type: RESET_PASSWORD_CONFIRM_FAIL
      })
      disptach({
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
