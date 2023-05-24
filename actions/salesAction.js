import { UPDATE_CURRENT_SALE, DELETE_PRODUCT_CURRENT_SALE } from "../types";

export const updateSaleData = (data) => {
  return {
    type: UPDATE_CURRENT_SALE,
    payload: data,
  };
};

export const deleteProductCurrentSale = (id) => {
  return {
    type: DELETE_PRODUCT_CURRENT_SALE,
    payload: id,
  };
};
