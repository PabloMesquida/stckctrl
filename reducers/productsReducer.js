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
      console.log("GET_PRODUCTS");
      return {
        ...state,
        productsData: [...state.productsData, ...action.payload],
        loading: false,
      };
    }

    case "GET_ALL_PRODUCTS": {
      console.log("GET_ALL_PRODUCTS");
      return {
        ...state,
        allProductsData: action.payload.map((data) => data),
        productsData: [],
        loading: false,
      };
    }

    case "GET_PRODUCT": {
      console.log("GET_PRODUCT", action.payload);
      return {
        ...state,
        productData: action.payload,
        loading: false,
      };
    }

    case "CREATE_PRODUCT": {
      console.log("CREATE_PRODUCT");
      return {
        ...state,
        productsData: [...state.productsData, action.payload],
        loading: false,
      };
    }

    case "UPDATE_PRODUCT": {
      console.log("UPDATE_PRODUCT");
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
      console.log("DELETE_PRODUCT");
      let newData = state.productsData.filter((el) => el.id !== action.payload);
      return {
        ...state,
        productsData: newData,
        allProductsData: newData,
        loading: false,
      };
    }

    case "GET_CATEGORIES": {
      console.log("GET_CATEGORIES");
      return {
        ...state,
        categories: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_CATEGORY": {
      console.log("GET_CATEGORY");
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    }

    case "GET_GENDERS": {
      console.log("GET_GENDERS");
      return {
        ...state,
        genders: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_GENDER": {
      console.log("GET_GENDER");
      return {
        ...state,
        gender: action.payload,
        loading: false,
      };
    }

    case "GET_SIZES": {
      console.log("GET_SIZES");
      return {
        ...state,
        sizes: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_COLORS": {
      console.log("GET_COLORS");
      return {
        ...state,
        colors: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_SUPPLIERS": {
      return {
        ...state,
        // suppliers: [...state.suppliers, ...action.payload],
        suppliers: action.payload.map((data) => data),
        loading: false,
      };
    }
    case "GET_ALL_SUPPLIERS": {
      return {
        ...state,
        suppliers: action.payload.map((data) => data),
        loading: false,
      };
    }

    case "GET_SUPPLIER": {
      return {
        ...state,
        suppliers: action.payload,
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
