const initialState = {
  products: [],
  loading: true,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return {
        ...state,

        products: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_PRODUCT": {
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }

    case "CREATE_PRODUCT": {
      console.log(action.payload);
      return {
        ...state,
        products: [...state.db, action.payload],
        loading: false,
      };
    }

    case "UPDATE_PRODUCT": {
      console.log(action.payload);
      let newData = state.db.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
      return {
        ...state,
        products: newData,
        loading: false,
      };
    }

    case "DELETE_PRODUCT": {
      let newData = state.db.filter((el) => el.id !== action.payload);

      return {
        ...state,
        products: newData,
        loading: false,
      };
    }
    default:
      return state;
  }
}
