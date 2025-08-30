import crypto from "crypto";
import axios from "axios";

// eSewa Configuration
const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY;
const ESEWA_PRODUCT_CODE = process.env.ESEWA_PRODUCT_CODE;
const ESEWA_GATEWAY_URL = process.env.ESEWA_GATEWAY_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

// Helper function to generate eSewa signature
const generateEsewaSignature = (total_amount, transaction_uuid, product_code) => {
    const data = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    return crypto.createHmac('sha256', ESEWA_SECRET_KEY).update(data).digest('base64');
};

// Initialize eSewa Payment
export const initializeEsewaPayment = async (req, res) => {
    try {
        const { total_amount } = req.body;
        
        // Validate input
        if (!total_amount || total_amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid total amount is required"
            });
        }

        // Generate unique transaction ID
        const transaction_uuid = `TXN-${Date.now()}`;
        
        // Generate signature
        const signature = generateEsewaSignature(total_amount, transaction_uuid, ESEWA_PRODUCT_CODE);

        const successUrl = `${BACKEND_URL}/api/payment/success`;
        const failureUrl = `${BACKEND_URL}/api/payment/failure`;

        console.log('Success URL:', successUrl);
        console.log('Failure URL:', failureUrl);

        // Return payment form data for frontend to submit
        res.json({
            success: true,
            message: "Payment initialized successfully",
            payment: {
                action: `${ESEWA_GATEWAY_URL}/api/epay/main/v2/form`,
                method: "POST",
                fields: {
                    amount: total_amount,
                    tax_amount: 0,
                    total_amount: total_amount,
                    transaction_uuid: transaction_uuid,
                    product_code: ESEWA_PRODUCT_CODE,
                    product_service_charge: 0,
                    product_delivery_charge: 0,
                    success_url: successUrl,
                    failure_url: failureUrl,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    signature: signature
                }
            }
        });

    } catch (error) {
        console.error("Payment initialization error:", error);
        res.status(500).json({
            success: false,
            message: "Payment initialization failed",
            error: error.message
        });
    }
};

// Handle Payment Success - REDIRECT DIRECTLY TO HOME
export const handlePaymentSuccess = async (req, res) => {
    try {
        console.log('Payment success endpoint hit');
        console.log('Query params:', req.query);
        
        const { data } = req.query;
        
        if (!data) {
            console.log("No payment data received");
            return res.redirect(`${FRONTEND_URL}/payment/failed?error=no_data`);
        }

        // Decode the base64 response from eSewa
        const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
        console.log("Decoded payment data:", decodedData);
        
        // Verify signature to ensure data integrity
        const dataToVerify = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${decodedData.product_code},signed_field_names=${decodedData.signed_field_names}`;
        
        const expectedSignature = crypto
            .createHmac('sha256', ESEWA_SECRET_KEY)
            .update(dataToVerify)
            .digest('base64');

        if (expectedSignature !== decodedData.signature) {
            console.log("Invalid signature - possible tampering");
            return res.redirect(`${FRONTEND_URL}/payment/failed?error=invalid_signature`);
        }

        // Double-check with eSewa API for final verification
        const verifyUrl = `${ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${decodedData.product_code}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`;
        
        const response = await axios.get(verifyUrl);
        console.log("eSewa verification response:", response.data);
        
        if (response.data.status === "COMPLETE") {
            console.log("Payment verified successfully");
            
            // REDIRECT TO HOME WITH A SIMPLE SUCCESS FLAG
            res.redirect(`${FRONTEND_URL}/?success=1`);
        } else {
            console.log("Payment not completed:", response.data.status);
            res.redirect(`${FRONTEND_URL}/payment/failed?error=payment_incomplete`);
        }

    } catch (error) {
        console.error("Payment verification error:", error);
        res.redirect(`${FRONTEND_URL}/payment/failed?error=verification_failed`);
    }
};

// Handle Payment Failure
export const handlePaymentFailure = (req, res) => {
    console.log("Payment failure endpoint hit");
    console.log("Payment failed or cancelled by user");
    res.redirect(`${FRONTEND_URL}/payment/failed?error=payment_cancelled`);
};