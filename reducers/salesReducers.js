const initialState = {
  currentSale: [],
  daySales: [],
  loading: true,
};

export default function salesReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_SALE": {
      return {
        ...state,
        currentSale: [...state.currentSale, ...action.payload],
        loading: false,
      };
    }
    default:
      return state;
  }
}
