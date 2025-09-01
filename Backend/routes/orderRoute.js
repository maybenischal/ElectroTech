import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getUserOrders,
    deleteOrder,
    createOrderFromPaymentEndpoint
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes
router.post("/create", createOrder);
router.post("/create-from-payment", createOrderFromPaymentEndpoint);

// Admin routes (require authentication)
router.get("/all", adminAuth, getAllOrders);
router.get("/:orderId", adminAuth, getOrderById);
router.put("/:orderId/status", adminAuth, updateOrderStatus);
router.delete("/:orderId", adminAuth, deleteOrder);

// User routes
router.get("/user/:userId", getUserOrders);

export default router;