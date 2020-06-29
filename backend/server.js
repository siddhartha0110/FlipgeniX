import express from 'express';
import data from './data';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoute';
import productRoute from './routes/productRoute';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoDB = config.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MONGO DB Connected'))
    .catch(err => console.log(err))

app.use('/api/users', userRoutes);
app.use('/api/products', productRoute);

//app.get('/api/products', (req, res) => {
//    res.send(data.products);
//})
//
//app.get('/api/products/:id', (req, res) => {
//    const productId = req.params.id;
//    const product = data.products.find(product => product._id === productId)
//    if (product)
//        res.send(product);
//    else
//        res.status(404).send({ message: 'Product Not Found' })
//})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})