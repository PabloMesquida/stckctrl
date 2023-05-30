const initialStateSales = {
  currentSale: { products: [], summary: [] },
  daySales: [],
  loading: true,
};

export default function salesReducer(state = initialStateSales, action) {
  switch (action.type) {
    case "ADD_PRODUCT_CURRENT_SALE": {
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          products: [...state.currentSale.products, action.payload],
        },
        loading: false,
      };
    }
    case "UPDATE_PRODUCT_COLOR_CURRENT_SALE": {
      const { productId, colorId, colorName } = action.payload;
      const productIndex = state.currentSale.products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        const updatedProduct = {
          ...state.currentSale.products[productIndex],
          color: { id: colorId, nombre: colorName },
        };

        const updatedProducts = [
          ...state.currentSale.products.slice(0, productIndex),
          updatedProduct,
          ...state.currentSale.products.slice(productIndex + 1),
        ];

        return {
          ...state,
          currentSale: {
            ...state.currentSale,
            products: updatedProducts,
          },
          loading: false,
        };
      }

      return state;
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
