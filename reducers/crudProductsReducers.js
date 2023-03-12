const initialState = {
  products: [],
  loading: true,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        getProductsData: action.payload,
        loading: false,
      };

    case "GET_PRODUCT":
      return {
        ...state,
        getProductData: action.payload,
        loading: false,
      };

    case "CREATE_PRODUCT":
      return {
        ...state,
        createProduct: action.payload,
        loading: false,
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        updateProduct: action.payload,
        loading: false,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        deleteProduct: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
