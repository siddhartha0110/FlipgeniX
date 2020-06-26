import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { cartReducer } from "./reducers/cartReducer";
import { userSignInReducer } from './reducers/userReducer';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems } };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
export default store; 