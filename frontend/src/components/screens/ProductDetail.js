import React from 'react'
import data from '../../data';
import { Link } from 'react-router-dom';

const ProductDetail = (props) => {
    console.log(props);
    const product = data.products.find(product => product._id === props.match.params.id);
    console.log(product);
    return (
        <div>
            <div className="back-to-result">
                <Link to="/"><i className="fas fa-chevron-left"></i> Back To Result</Link>
            </div>
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
                        <li>Status: {product.status}</li>
                        <li>
                            Qty: <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </li>
                        <li>
                            <button className="btn">Add to Cart<i className="fas fa-cart-plus"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
