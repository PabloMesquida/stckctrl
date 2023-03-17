const initialState = {
  productsData: [],
  loading: true,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return {
        ...state,
        productsData: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_PRODUCT": {
      return {
        ...state,
        productsData: action.payload,
        loading: false,
      };
    }

    case "CREATE_PRODUCT": {
      return {
        ...state,
        productsData: [...state.db, action.payload],
        loading: false,
      };
    }

    case "UPDATE_PRODUCT": {
      let newData = state.db.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
      return {
        ...state,
        productsData: newData,
        loading: false,
      };
    }

    case "DELETE_PRODUCT": {
      let newData = state.db.filter((el) => el.id !== action.payload);

      return {
        ...state,
        productsData: newData,
        loading: false,
      };
    }
    default:
      return state;
  }
}
