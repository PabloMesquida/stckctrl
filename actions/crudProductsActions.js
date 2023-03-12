// import axios from "axios";
// import {
//   CREATE_DATA,
//   CREATE_DATA_REQUEST,
//   CREATE_DATA_SUCCESS,
//   READ_ALL_DATA,
//   READ_ALL_DATA_SUCCESS,
//   READ_ALL_DATA_FAILURE,
//   READ_SINGLE_DATA,
//   READ_SINGLE_DATA_SUCCESS,
//   READ_SINGLE_DATA_FAILURE,
//   UPDATE_DATA,
//   UPDATE_DATA_SUCCESS,
//   UPDATE_DATA_FAILURE,
//   DELETE_DATA,
//   DELETE_DATA_SUCCESS,
//   DELETE_DATA_FAILURE,
//   NO_DATA,
// } from "./types";

export const getProductsData = (data) => {
  return {
    type: "GET_PRODUCTS",
    payload: data,
  };
};

export const getProductData = (data) => {
  return {
    type: "GET_PRODUCT",
    payload: data,
  };
};

export const createProduct = (data) => {
  return {
    type: "CREATE_PRODUCT",
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
