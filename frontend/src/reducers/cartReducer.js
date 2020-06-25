import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/actionTypes';

function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(cart => cart.product === item.product);
            if (product) {
                return {
                    cartItems: state.cartItems.map(Citem => Citem.product === product.product ? item : Citem)
                }
            }
            return {
                cartItems: [...state.cartItems, item]
            }
        case REMOVE_FROM_CART:
            return {
                cartItems: state.cartItems.filter(Citem => Citem.product !== action.payload)
            }
        default:
            return state;
    }
}

export { cartReducer };