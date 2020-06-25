import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
const ProductDetail = (props) => {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/"><i className="fas fa-chevron-left"></i> Back To Result</Link>
            </div>
            {
                loading ? <div>Loading...</div> :
                    error ? <div>{error}</div> :
                        (
                            <div className="details">
                                <div className="details-image">
                                    <img src={product.image} alt="product" />
                                </div>
                                <div className="details-info">
                                    <ul>
                                        <li><h4>{product.name}</h4></li>
                                        <li>{product.rating} stars ({product.reviews} Reviews)</li>
                                        <li>Price: <b>₹{product.price}</b></li>
                                        <li>Offers:
                            <div>
                                                <b>    {product.description}</b>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="details-action">
                                    <ul>
                                        <li><b>Price: ₹{product.price}</b></li>
                                        <li>Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"} </li>
                                        <li>
                                            Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                                {[...Array(product.countInStock).keys()].map(ele =>
                                                    <option value={ele + 1}>{ele + 1}</option>
                                                )}
                                            </select>
                                        </li>
                                        <li>
                                            {product.countInStock > 0 ?
                                                <button className="btn" onClick={handleAddToCart}>Add to Cart<i className="fas fa-cart-plus"></i></button>
                                                : <div>Out of Stock</div>
                                            }

                                        </li>
                                    </ul>
                                </div>
                            </div>

                        )
            }
        </div>
    )
}

export default ProductDetail
