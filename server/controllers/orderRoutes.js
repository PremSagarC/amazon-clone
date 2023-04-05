import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'

export const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems, shippingAddress, paymentMethod, shippingPrice,
        totalPrice, paymentDetails, userInfo } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400).json('No order items found.')
    } else {
        const order = new Order({
            orderItems,
            user: userInfo._id,
            username: userInfo.name,
            email: userInfo.email,
            shippingAddress,
            paymentMethod,
            paymentDetails,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder) 
    }
})

