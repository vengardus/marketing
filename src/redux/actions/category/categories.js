import { get_axios }  from "../../../mylib/axios"
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
} from './types'


export const get_categories = () => {
    const api_url = `${process.env.REACT_APP_API_URL}/api/category/list`

    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    }

    return get_axios(api_url, config, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL)
}