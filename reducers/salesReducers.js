const initialStateSales = {
  currentSale: [],
  daySales: [],
  loading: true,
};

export default function salesReducer(state = initialStateSales, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_SALE": {
      return {
        ...state,
        currentSale: [...state.currentSale, action.payload],
        loading: false,
      };
    }
    case "DELETE_PRODUCT_CURRENT_SALE": {
      let newData = state.currentSale.filter(
        (el) => el.data.id !== action.payload
      );
      return {
        ...state,
        currentSale: newData,
        loading: false,
      };
    }
    default:
      return state;
  }
}
