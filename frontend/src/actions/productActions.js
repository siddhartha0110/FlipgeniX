import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from './actionTypes';
import axios from 'axios';


const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('http://127.0.0.1:8000/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get('http://127.0.0.1:8000/api/products/' + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_SAVE_REQUEST,
            payload: product
        })
        const { userSignIn: { userInfo } } = getState();
        if (!product._id) {
            const { data } = await axios.post('http://127.0.0.1:8000/api/products/', product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })

            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: data
            })
        } else {
            const { data } = await axios.put('http://127.0.0.1:8000/api/products/' + product._id, product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })

            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: data
            })
        }


    }
    catch (error) {
        dispatch({
            type: PRODUCT_SAVE_FAIL,
            payload: error.message
        })
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userSignIn: { userInfo } } = getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
        const { data } = await axios.delete('http://127.0.0.1:8000/api/products/' + productId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message
        })
    }
}

export { listProducts, detailsProduct, saveProduct, deleteProduct };