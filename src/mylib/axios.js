import axios from 'axios';


export const get_axios = (api_url, config, type_success, type_fail, status_ok=200) => async dispatch => {
  try {
    const res = await axios.get(api_url, config)

    if (res.status === status_ok) {
      dispatch({
        type: type_success,
        payload: res.data
      });
    } else {
      dispatch({
        type: type_fail
      });
    }

  } catch (err) {
    dispatch({
      type: type_fail
    });
  }
}

export const do_dispatch = (type_dispatch) => async dispatch => {
  dispatch({
    type: type_dispatch
  });
}

export const post_axios = (api_url, body, config, type_success, type_fail, status_ok=200) => async dispatch => {
  try {
    const res = await axios.post(api_url, body, config)

    if (res.status === 200) {
      dispatch({
        type: type_success,
      })
    }
    else {
      dispatch({
        type: type_fail
      })
    }
  }
  catch (err) {
    dispatch({
      type: type_fail
    })
  }
}