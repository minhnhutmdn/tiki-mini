import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://localhost:3005/v1/product';

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchProductsCategory(category) {
  const request = axios.get(`${ROOT_URL}/categories/${category}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createProduct(props) {
  const request = axios.product(`${ROOT_URL}/add`, props);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchProduct(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deleteProduct(id) {
  const request = axios.delete(`${ROOT_URL}/${id}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}
