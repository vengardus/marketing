import axios from "axios";
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
} from './types'


export const get_categories = () => async disptach => {
    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    }

    const route = '/api/category/list'
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/${route}`, config)

        if (res.status === 200) {
            disptach({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }
        else {
            disptach({
                type: GET_CATEGORIES_FAIL
            })       
        }
    }
    catch (err) {
        disptach({
            type: GET_CATEGORIES_FAIL
        })       
    }
}