import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { cartReducer } from "./reducers/cartReducer";
import { userSignInReducer, userRegisterReducer } from './reducers/userReducer';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: { cartItems }, userSignIn: { userInfo } };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
export default store; 