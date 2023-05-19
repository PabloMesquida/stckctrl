import { combineReducers } from "redux";
import productsReducer from "./productsReducer.js";
import salesReducer from "./salesReducers.js";

const reducer = combineReducers({
  products: productsReducer,
});

export default reducer;
