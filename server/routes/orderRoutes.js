import express from 'express'
import protectRoute from '../authenticateMiddleware/Middleware.js'
import { createOrder } from '../controllers/orderRoutes.js'

const orderRoutes = express.Router()

orderRoutes.post('/', (protectRoute, createOrder))

export default orderRoutes    