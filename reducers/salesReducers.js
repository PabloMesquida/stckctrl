const initialStateSales = {
  currentSale: { products: [], summary: [] },
  daySales: [],
  loading: true,
};

export default function salesReducer(state = initialStateSales, action) {
  switch (action.type) {
    case "ADD_PRODCUT_CURRENT_SALE": {
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          products: [...state.currentSale.products, action.payload],
        },
        loading: false,
      };
    }
    case "DELETE_PRODUCT_CURRENT_SALE": {
      let newData = state.currentSale.products.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          products: newData,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
}
