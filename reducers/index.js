import { combineReducers } from "redux";
import productsReducer from "./crudProductsReducers";

const reducer = combineReducers({ products: productsReducer });

export default reducer;
