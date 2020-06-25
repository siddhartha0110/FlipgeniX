import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from './actionTypes';

const addToCart = (productId, qty) => async (dispatch) => {
    try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/products/' + productId);
        dispatch({
            type: ADD_TO_CART, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
    } catch (error) {

    }
}

const removeFromCart = (productId) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId })
}

export { addToCart, removeFromCart };