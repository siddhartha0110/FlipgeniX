import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [])


    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ?
                            <div>It's so Empty Here <i className="far fa-frown"></i>.Head over to Shop</div> :
                            cartItems.map(item =>
                                <li>
                                    <div className="cart-image">
                                        <img src={item.image} alt="ItemImage" />
                                    </div>
                                    <div className='cart-name'>
                                        <Link to={"/product/" + item.product}>
                                            <div>{item.name}</div>
                                        </Link>
                                        <div>
                                            Qty:
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>

                                            </select>
                                            <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                                Delete <i className="far fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        ₹ {item.price}
                                    </div>

                                </li>
                            )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    SubTotal: ({cartItems.reduce((sum, item) => sum + item.qty, 0)} items)
                    :
                    ₹ {cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}
                </h3>
                <button className="btn primary" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                    Proceed To Checkout <i className="far fa-credit-card"></i>
                </button>
            </div>
        </div>
    )
}

export default Cart;
