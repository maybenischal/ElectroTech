import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const {
            items,
            totalAmount,
            transactionId,
            esewaTransactionId,
            userId,
            customerEmail,
            customerName,
            shippingAddress,
            paymentMethod = 'esewa'
        } = req.body;

        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required"
            });
        }

        if (!totalAmount || !transactionId) {
            return res.status(400).json({
                success: false,
                message: "Total amount and transaction ID are required"
            });
        }

        // Check if order with this transaction ID already exists
        const existingOrder = await orderModel.findOne({ transactionId });
        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: "Order with this transaction ID already exists",
                order: existingOrder
            });
        }

        // Validate products exist and get current prices
        const validatedItems = [];
        for (const item of items) {
            // Handle both MongoDB ObjectId and string IDs
            const productId = item.productId || item.id;
            if (!productId) {
                // If no product ID, create basic item
                validatedItems.push({
                    productId: null,
                    name: item.name || 'Unknown Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    image: item.image || ''
                });
                continue;
            }

            const product = await productModel.findById(productId);
            if (!product) {
                console.warn(`Product not found: ${productId}, using item data`);
                // Use the item data if product not found
                validatedItems.push({
                    productId: productId,
                    name: item.name || 'Unknown Product',
                    price: item.price || 0,
                    quantity: item.quantity || 1,
                    image: item.image || ''
                });
                continue;
            }

            validatedItems.push({
                productId: product._id,
                name: product.name,
                price: product.price, // Use current price from database
                quantity: item.quantity,
                image: product.image || item.image // product.image is string, not array
            });
        }

        // Generate order number
        const orderNumber = orderModel.generateOrderNumber();

        // Create order
        const order = new orderModel({
            orderNumber,
            userId,
            customerEmail,
            customerName,
            items: validatedItems,
            totalAmount,
            transactionId,
            esewaTransactionId,
            shippingAddress,
            paymentMethod,
            paymentStatus: 'completed', // Since we're creating after successful payment
            status: 'confirmed'
        });

        const savedOrder = await order.save();

        // Populate product details
        await savedOrder.populate('items.productId', 'name category');
        await savedOrder.populate('userId', 'name email');

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        const paymentStatus = req.query.paymentStatus;
        const search = req.query.search;

        // Build filter object
        const filter = {};
        if (status) filter.status = status;
        if (paymentStatus) filter.paymentStatus = paymentStatus;
        if (search) {
            filter.$or = [
                { orderNumber: { $regex: search, $options: 'i' } },
                { customerEmail: { $regex: search, $options: 'i' } },
                { customerName: { $regex: search, $options: 'i' } },
                { transactionId: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const orders = await orderModel
            .find(filter)
            .populate('userId', 'name email')
            .populate('items.productId', 'name category')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await orderModel.countDocuments(filter);

        // Calculate statistics
        const stats = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$totalAmount' },
                    pendingOrders: {
                        $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                    },
                    confirmedOrders: {
                        $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
                    },
                    completedOrders: {
                        $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
                    }
                }
            }
        ]);

        res.json({
            success: true,
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalOrders: total,
                limit
            },
            stats: stats[0] || {
                totalOrders: 0,
                totalRevenue: 0,
                pendingOrders: 0,
                confirmedOrders: 0,
                completedOrders: 0
            }
        });

    } catch (error) {
        console.error("Get orders error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel
            .findById(orderId)
            .populate('userId', 'name email phone')
            .populate('items.productId', 'name category description');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get order error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: error.message
        });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, notes } = req.body;

        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const updateData = { status };
        if (notes) updateData.notes = notes;
        if (status === 'delivered') updateData.completedAt = new Date();

        const order = await orderModel
            .findByIdAndUpdate(orderId, updateData, { new: true })
            .populate('userId', 'name email')
            .populate('items.productId', 'name');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Update order status error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message
        });
    }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const orders = await orderModel
            .find({ userId })
            .populate('items.productId', 'name image')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await orderModel.countDocuments({ userId });

        res.json({
            success: true,
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalOrders: total,
                limit
            }
        });

    } catch (error) {
        console.error("Get user orders error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user orders",
            error: error.message
        });
    }
};

// Delete order (Admin only)
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {
        console.error("Delete order error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete order",
            error: error.message
        });
    }
};

// Create order from payment data (with cart items)
export const createOrderFromPaymentEndpoint = async (req, res) => {
    try {
        const {
            transactionData,
            cartItems = [],
            userId = null,
            customerEmail = null,
            customerName = null
        } = req.body;

        console.log('Creating order from payment endpoint:', transactionData);

        // Use the utility function
        const { createOrderFromPayment } = await import('../utils/orderUtils.js');
        const result = await createOrderFromPayment({
            ...transactionData,
            user_id: userId,
            customer_email: customerEmail,
            customer_name: customerName
        }, cartItems);

        if (result.success) {
            res.status(201).json({
                success: true,
                message: "Order created successfully from payment",
                order: result.order
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.error || "Failed to create order from payment"
            });
        }

    } catch (error) {
        console.error("Create order from payment endpoint error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create order from payment",
            error: error.message
        });
    }
};