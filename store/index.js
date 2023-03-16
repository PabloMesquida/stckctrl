import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "@/reducers";

const store = configureStore({ reducer, middeleware: applyMiddleware(thunk) });

store.subscribe(() => console.log(store));

export default store;
