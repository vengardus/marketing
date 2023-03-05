import axios from 'axios';
import { get_axios } from '../../../lib/axios';
import {
  GET_BLOG_LIST_SUCCESS,
  GET_BLOG_LIST_FAIL,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  GET_BLOG_LIST_CATEGORIES_SUCCESS,
  GET_BLOG_LIST_CATEGORIES_FAIL,
  GET_SEARCH_BLOG_SUCCESS,
  GET_SEARCH_BLOG_FAIL,

  GET_AUTHOR_BLOG_LIST_SUCCESS,
  GET_AUTHOR_BLOG_LIST_FAIL,
} from "./types"


export const get_blog_list = (page=null) => {
  const api_url = (page===null)?
    `${process.env.REACT_APP_API_URL}/api/blog/list`:
    `${process.env.REACT_APP_API_URL}/api/blog/list?p=${page}`

  const config = {
    headers: {
      'Accept': 'application/json'
    }
  };

  return get_axios(api_url, config, GET_BLOG_LIST_SUCCESS, GET_BLOG_LIST_FAIL)
}


export const get_blog_list_category = (slug, page=null) => {
  const api_url = (page===null)?
    `${process.env.REACT_APP_API_URL}/api/blog/bycategory?slug=${slug}` :
    `${process.env.REACT_APP_API_URL}/api/blog/by_category?slug=${slug}&p=${page}`

  const config = {
    headers: {
      'Accept': 'application/json'
    }
  };

  return get_axios(api_url, config, GET_BLOG_LIST_CATEGORIES_SUCCESS, GET_BLOG_LIST_CATEGORIES_FAIL)
}


export const get_blog = (slug) => {
  const api_url = `${process.env.REACT_APP_API_URL}/api/blog/detail/${slug}`

  const config = {
    headers: {
      'Accept': 'application/json'
    }
  };

  return get_axios(api_url, config, GET_BLOG_SUCCESS, GET_BLOG_FAIL)
}

export const search_blog = (search_term, page=null) => {
  const api_url = (page===null)?
    `${process.env.REACT_APP_API_URL}/api/blog/search?s=${search_term}` :
    `${process.env.REACT_APP_API_URL}/api/blog/search?p=${page}&s=${search_term}`

  const config = {
    headers: {
      'Accept': 'application/json'
    }
  };

  return get_axios(api_url, config, GET_SEARCH_BLOG_SUCCESS, GET_SEARCH_BLOG_FAIL)
};


/*
// Posts by Author
*/
export const get_blog_author_list = (page=null) => {
  const api_url = (page===null)? 
    `${process.env.REACT_APP_API_URL}/api/blog/author_list` :
    `${process.env.REACT_APP_API_URL}/api/blog/author_list?p=${page}`

  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`
    }
  };

  return get_axios(api_url, config, GET_AUTHOR_BLOG_LIST_SUCCESS, GET_AUTHOR_BLOG_LIST_FAIL)
}


