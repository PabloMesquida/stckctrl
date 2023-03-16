import { combineReducers } from "redux";
import productsReducer from "./productsReducer";

const reducer = combineReducers({ products: productsReducer });

export default reducer;
