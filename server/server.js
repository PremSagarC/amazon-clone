import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route value
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


const PORT = process.env.PORT || 5000;
const CONNECT_URL = process.env.MONGO_URL;

try {
    await mongoose.connect(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Database connected successfully`);
} catch (error) {
    console.log({ msg: error.message })
}

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})