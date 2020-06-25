import express from 'express';
const app = express();
import data from './data';
import cors from 'cors';

app.use(cors());

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(product => product._id === productId)
    if (product)
        res.send(product);
    else
        res.status(404).send({ message: 'Product Not Found' })
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})