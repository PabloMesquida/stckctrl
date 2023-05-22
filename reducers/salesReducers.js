const initialStateSales = {
  currentSale: [],
  daySales: [],
  loading: true,
};

export default function salesReducer(state = initialStateSales, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_SALE": {
      console.log("UPDATE_CURRENT_SALE", action.payload);
      return {
        ...state,
        currentSale: [...state.currentSale, action.payload],
        loading: false,
      };
    }
    default:
      return state;
  }
}
