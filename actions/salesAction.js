import { UPDATE_CURRENT_SALE } from "../types";

export const updateSaleData = (data) => {
  return {
    type: UPDATE_CURRENT_SALE,
    payload: data,
  };
};
