import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../types";

export const getProductsData = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const getProductData = (id) => {
  return {
    type: "GET_PRODUCT",
    payload: id,
  };
};

export const createProduct = (data) => {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  };
};

export const updateProduct = (data) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: data,
  };
};

export const deleteProduct = (id) => {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
};
