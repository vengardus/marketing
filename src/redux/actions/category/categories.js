import axios from "axios";
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
} from './types'


export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    }

    const route = '/api/category/list'
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/${route}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            })       
        }
    }
    catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        })       
    }
}