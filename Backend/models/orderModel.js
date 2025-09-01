import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null // Allow guest orders
    },
    customerEmail: {
        type: String,
        default: null
    },
    customerName: {
        type: String,
        default: null
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['esewa', 'cod', 'bank_transfer'],
        default: 'esewa'
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    esewaTransactionId: {
        type: String,
        default: null
    },
    shippingAddress: {
        street: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        zipCode: { type: String, default: null },
        country: { type: String, default: 'Nepal' }
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    }
});

// Pre-save middleware to update the updatedAt field
orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to generate order number
orderSchema.statics.generateOrderNumber = function() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
};

// Instance method to calculate total
orderSchema.methods.calculateTotal = function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Virtual for formatted order number
orderSchema.virtual('formattedOrderNumber').get(function() {
    return this.orderNumber.replace('ORD-', '#');
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;