import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_GENDERS,
  GET_SUPPLIERS,
  GET_SIZES,
} from "../types";

export const getProductsData = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const getProductData = (data) => {
  return {
    type: GET_PRODUCT,
    payload: data,
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
    type: UPDATE_PRODUCT,
    payload: data,
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

export const getCategories = (data) => {
  return {
    type: GET_CATEGORIES,
    payload: data,
  };
};

export const getCategory = (data) => {
  return {
    type: GET_CATEGORY,
    payload: data,
  };
};

export const getGenders = (data) => {
  return {
    type: GET_GENDERS,
    payload: data,
  };
};

export const getSuppliers = (data) => {
  return {
    type: GET_SUPPLIERS,
    payload: data,
  };
};

export const getSizes = (data) => {
  return {
    type: GET_SIZES,
    payload: data,
  };
};
