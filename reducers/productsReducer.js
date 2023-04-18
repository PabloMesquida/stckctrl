const initialState = {
  productsData: [],
  categories: [],
  genders: [],
  suppliers: [],
  loading: true,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return {
        ...state,
        productsData: [...state.productsData, ...action.payload],
        //  productsData: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_PRODUCT": {
      return {
        ...state,
        productData: action.payload,
        loading: false,
      };
    }

    case "CREATE_PRODUCT": {
      return {
        ...state,
        productsData: [...state.productsData, action.payload],
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
      let newData = state.productsData.filter((el) => el.id !== action.payload);
      return {
        ...state,
        productsData: newData,
        loading: false,
      };
    }

    case "GET_CATEGORIES": {
      return {
        ...state,
        categories: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_CATEGORY": {
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    }

    case "GET_GENDERS": {
      return {
        ...state,
        genders: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_GENDER": {
      return {
        ...state,
        gender: action.payload,
        loading: false,
      };
    }

    case "GET_SUPPLIERS": {
      return {
        ...state,
        suppliers: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_SUPPLIER": {
      return {
        ...state,
        supplier: action.payload,
        loading: false,
      };
    }

    case "GET_SIZES": {
      return {
        ...state,
        sizes: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_COLORS": {
      return {
        ...state,
        colors: action.payload.map((data) => data),
        loading: false,
      };
    }

    // case "GET_STOCK": {
    //   return {
    //     ...state,
    //     stock: action.payload.map((data) => data),
    //     loading: false,
    //   };
    // }

    default:
      return state;
  }
}
