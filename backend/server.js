import express from 'express';
const app = express();
import data from './data';
import cors from 'cors';

app.use(cors());

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})