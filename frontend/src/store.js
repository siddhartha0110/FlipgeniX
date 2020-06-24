import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer } from './reducers/productReducer';
import thunk from 'redux-thunk';

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
export default store; 