import {
  GET_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  RESET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_GENDERS,
  GET_GENDER,
  GET_ALL_SUPPLIERS,
  GET_SUPPLIERS,
  GET_SUPPLIER,
  DELETE_SUPPLIER,
  GET_SIZES,
  GET_COLORS,
} from "../types";

export const getProductsData = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const getAllProductsData = (data) => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: data,
  };
};

export const getProductData = (data) => {
  return {
    type: GET_PRODUCT,
    payload: data,
  };
};

export const resetProductData = () => {
  console.log("resetProductDAta");
  return {
    type: RESET_PRODUCTS,
  };
};

export const createProduct = (data) => {
  return {
    type: CREATE_PRODUCT,
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

export const getGender = (data) => {
  return {
    type: GET_GENDER,
    payload: data,
  };
};

export const getSizes = (data) => {
  return {
    type: GET_SIZES,
    payload: data,
  };
};

export const getColors = (data) => {
  return {
    type: GET_COLORS,
    payload: data,
  };
};

export const getAllSuppliersData = (data) => {
  return {
    type: GET_ALL_SUPPLIERS,
    payload: data,
  };
};

export const getSuppliers = (data) => {
  return {
    type: GET_SUPPLIERS,
    payload: data,
  };
};

export const getSupplier = (data) => {
  return {
    type: GET_SUPPLIER,
    payload: data,
  };
};

export const deleteSupplier = (id) => {
  return {
    type: DELETE_SUPPLIER,
    payload: id,
  };
};
