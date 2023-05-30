import {
  ADD_PRODUCT_CURRENT_SALE,
  UPDATE_PRODUCT_COLOR_CURRENT_SALE,
  DELETE_PRODUCT_CURRENT_SALE,
} from "../types";

export const addProductSale = (data) => {
  return {
    type: ADD_PRODUCT_CURRENT_SALE,
    payload: data,
  };
};

export const updateProductColorCurrentSale = (
  productId,
  colorId,
  colorName
) => {
  return {
    type: UPDATE_PRODUCT_COLOR_CURRENT_SALE,
    payload: { productId, colorId, colorName },
  };
};

export const deleteProductCurrentSale = (id) => {
  return {
    type: DELETE_PRODUCT_CURRENT_SALE,
    payload: id,
  };
};
