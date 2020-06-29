import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../../actions/productActions';

const Products = (props) => {
    const [modal, setModal] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, error: errorSave, success: successSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModal(false);
        }
        dispatch(listProducts());
        return () => {
            //
        }
    }, [successSave, successDelete])

    const openModal = (product) => {
        setModal(true);
        setId(product._id)
        setName(product.name);
        setPrice(product.price)
        setBrand(product.brand);
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description);
        setCountInStock(product.countInStock);
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    const submitFormHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, price, brand, image, category, description, countInStock
        }));
    }

    return (

        <div className="content content-margin">
            <div className="product-header">
                <h3>Products</h3>
                <button className="btn" onClick={() => openModal({})}>Create Product</button>
            </div>
            {modal &&
                <div className="form">
                    <form onSubmit={submitFormHandler}>
                        <ul className="form-container" style={{ width: "100%" }}>
                            <li>
                                <h3 className="text-center">{id ? "Edit Product" : "Create New Product"}</h3>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="name">Product Name</label>
                                <input type="text" name="name" value={name} id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="name">Image</label>
                                <input type="text" name="image" value={image} id="image" placeholder="Image" onChange={(e) => setImage(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="price">Price</label>
                                <input type="text" name="price" id="price" value={price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="brand">Brand</label>
                                <input type="text" name="brand" id="brand" value={brand} placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="category">Category</label>
                                <input type="text" name="category" id="category" value={category} placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" id="description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="countInStock">Stock Quantity</label>
                                <input type="text" name="countInStock" id="countInStock" value={countInStock} placeholder="Stock Quantity" onChange={(e) => setCountInStock(e.target.value)} />
                            </li>
                            <li>
                                <button type="submit" className="btn primary">{id ? "Edit Product" : "Create Product"}  <i className="far fa-plus-square"></i></button>
                            </li>
                            <li>
                                <button type="button" className="btn primary" onClick={() => setModal(false)}><i className="fas fa-chevron-left"></i> Back</button>
                            </li>
                        </ul>
                    </form>
                </div>
            }

            {!modal && <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <button className="btn button secondary" onClick={() => openModal(product)}>Edit</button>
                                    {' '}
                                    <button className="btn button secondary" onClick={() => deleteHandler(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default Products;
