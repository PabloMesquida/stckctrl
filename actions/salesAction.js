import {
  ADD_PRODUCT_CURRENT_SALE,
  UPDATE_PRODUCT_COLOR_CURRENT_SALE,
  UPDATE_PRODUCT_SIZE_CURRENT_SALE,
  DELETE_PRODUCT_CURRENT_SALE,
  UPDATE_PAYMENT_CURRENT_SALE,
} from "../types";

export const addProductSale = (data) => {
  return {
    type: ADD_PRODUCT_CURRENT_SALE,
    payload: data,
  };
};

export const updateProductColorCurrentSale = (
  productId,
  updateId,
  updateName
) => {
  return {
    type: UPDATE_PRODUCT_COLOR_CURRENT_SALE,
    payload: { productId, updateId, updateName },
  };
};

export const updateProductSizeCurrentSale = (
  productId,
  updateId,
  updateName
) => {
  return {
    type: UPDATE_PRODUCT_SIZE_CURRENT_SALE,
    payload: { productId, updateId, updateName },
  };
};

export const deleteProductCurrentSale = (id) => {
  return {
    type: DELETE_PRODUCT_CURRENT_SALE,
    payload: id,
  };
};

export const updatePaymentCurrentSale = (data) => {
  return {
    type: UPDATE_PAYMENT_CURRENT_SALE,
    payload: data,
  };
};
