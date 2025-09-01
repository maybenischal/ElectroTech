
import express from "express";
import { 
    initializeEsewaPayment, 
    handlePaymentSuccess, 
    handlePaymentFailure,
    verifyTransaction
} from "../controllers/esewaController.js";

const router = express.Router();

// Route to initialize eSewa payment

router.post("/initialize-esewa", initializeEsewaPayment);

// Route to handle successful payment callback from eSewa

router.get("/success", handlePaymentSuccess);

// Route to handle failed payment callback from eSewa

router.get("/failure", handlePaymentFailure);

// Route to verify transaction for frontend validation
router.post("/verify-transaction", verifyTransaction);

export default router;