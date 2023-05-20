import { combineReducers } from "redux";
import productsReducer from "./productsReducer.js";
import salesReducer from "./salesReducers.js";

const reducer = combineReducers({
  products: productsReducer,
  sales: salesReducer,
});

export default reducer;
