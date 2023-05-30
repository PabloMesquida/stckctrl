import {
  ADD_PRODCUT_CURRENT_SALE,
  DELETE_PRODUCT_CURRENT_SALE,
} from "../types";

export const addProductSaleData = (data) => {
  return {
    type: ADD_PRODCUT_CURRENT_SALE,
    payload: data,
  };
};

export const deleteProductCurrentSale = (id) => {
  return {
    type: DELETE_PRODUCT_CURRENT_SALE,
    payload: id,
  };
};
