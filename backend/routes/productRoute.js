import express from 'express';
import Product from '../models/Product';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    if (!req.body.name || !req.body.image || !req.body.brand || !req.body.price || !req.body.category) {
        return res.status(406).send({ message: "All Fields are required" });
    }
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        reviews: req.body.reviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'Product Created', data: newProduct });
    }
    else {
        res.status(500).send({ message: 'Error in creating new product' });
    }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    if (product) {

        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.price = req.body.price;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    res.status(500).send({ message: 'Error in updating product' });

})

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: 'Product Deleted' })
    }
    else {

        res.send("Error in Deletion")
    }
})

export default router;