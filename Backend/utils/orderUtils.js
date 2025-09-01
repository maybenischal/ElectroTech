import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";

// Create order from payment success
export const createOrderFromPayment = async (transactionData, cartItems = []) => {
    try {
        console.log('Creating order from payment data:', transactionData);
        console.log('Cart items:', cartItems);

        const {
            transaction_uuid,
            transaction_code,
            total_amount,
            user_id = null,
            customer_email = null,
            customer_name = null
        } = transactionData;

        // Check if order already exists
        const existingOrder = await orderModel.findOne({ transactionId: transaction_uuid });
        if (existingOrder) {
            console.log('Order already exists:', existingOrder.orderNumber);
            return { success: true, order: existingOrder };
        }

        // If no cart items provided, create a placeholder order
        let orderItems = [];
        if (cartItems && cartItems.length > 0) {
            orderItems = cartItems.map(item => ({
                productId: item.id || item.productId || null, // Cart uses 'id', backend expects 'productId'
                name: item.name || 'Unknown Product',
                price: item.price || 0,
                quantity: item.quantity || 1,
                image: item.image || ''
            }));
        } else {
            // Create placeholder item if no cart data available
            orderItems = [{
                productId: null,
                name: 'Order Items',
                price: parseFloat(total_amount),
                quantity: 1,
                image: ''
            }];
        }

        // Generate order number
        const orderNumber = orderModel.generateOrderNumber();

        // Create order
        const order = new orderModel({
            orderNumber,
            userId: user_id && mongoose.Types.ObjectId.isValid(user_id) ? user_id : null,
            customerEmail: customer_email,
            customerName: customer_name,
            items: orderItems,
            totalAmount: parseFloat(total_amount),
            transactionId: transaction_uuid,
            esewaTransactionId: transaction_code,
            paymentMethod: 'esewa',
            paymentStatus: 'completed',
            status: 'confirmed',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedOrder = await order.save();
        console.log('Order created successfully:', savedOrder.orderNumber);

        return { success: true, order: savedOrder };

    } catch (error) {
        console.error('Error creating order from payment:', error);
        return { success: false, error: error.message };
    }
};

export default { createOrderFromPayment };