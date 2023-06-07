const initialStateSales = {
  currentSale: {
    products: [],
    summary: { payment: { id: 1, nombre: "Efectivo" }, discount: 0, amount: 0 },
  },
  daySales: [],
  loading: true,
};

export default function salesReducer(state = initialStateSales, action) {
  switch (action.type) {
    case "ADD_PRODUCT_CURRENT_SALE": {
      const newProduct = {
        ...action.payload,
        clearance: false,
        amount: action.payload.data.precio,
      };

      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          products: [...state.currentSale.products, newProduct],
        },
        loading: false,
      };
    }
    case "UPDATE_PRODUCT_COLOR_CURRENT_SALE": {
      return updateProduct(state, action, "color");
    }

    case "UPDATE_PRODUCT_SIZE_CURRENT_SALE": {
      return updateProduct(state, action, "size");
    }

    case "UPDATE_CLEARANCE_PRODUCT_CURRENT_SALE": {
      const productId = action.payload;

      const updatedProducts = state.currentSale.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            clearance: !product.clearance,
            amount: product.clearance
              ? product.data.precio
              : product.data.precio_liq,
          };
        }
        return product;
      });

      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          products: updatedProducts,
        },
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

    case "UPDATE_PAYMENT_CURRENT_SALE": {
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          summary: {
            ...state.currentSale.summary,
            payment: action.payload,
          },
        },
      };
    }

    case "UPDATE_AMOUNT_CURRENT_SALE": {
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          summary: {
            ...state.currentSale.summary,
            amount: action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
}

const updateProduct = (state, action, updateFn) => {
  const { productId, updateId, updateName } = action.payload;
  const productIndex = state.currentSale.products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    const updatedProduct = {
      ...state.currentSale.products[productIndex],
      [updateFn]: { id: updateId, nombre: updateName },
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
};
