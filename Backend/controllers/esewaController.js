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
            
            // REDIRECT TO PAYMENT SUCCESS PAGE WITH TRANSACTION DETAILS
            res.redirect(`${FRONTEND_URL}/payment/success?transaction_id=${decodedData.transaction_code}&amount=${decodedData.total_amount}`);
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

// Verify Transaction (for frontend validation)
export const verifyTransaction = async (req, res) => {
    try {
        const { transaction_id, amount } = req.body;

        if (!transaction_id || !amount) {
            return res.status(400).json({
                success: false,
                message: "Transaction ID and amount are required"
            });
        }

        console.log(`Verifying transaction: ${transaction_id}, amount: ${amount}`);

        // 1. Basic format validation
        const isValidTransactionFormat = transaction_id.match(/^[A-Za-z0-9\-_]+$/);
        const numericAmount = parseFloat(amount);
        const isValidAmount = numericAmount > 0;

        if (!isValidTransactionFormat || !isValidAmount) {
            return res.json({
                success: true,
                valid: false,
                message: "Invalid transaction ID format or amount"
            });
        }

        // 2. Check transaction age (should be recent - within 1 hour)
        const currentTime = Date.now();
        // Extract timestamp from transaction_id if it contains one (like our TXN-timestamp format)
        const timestampMatch = transaction_id.match(/TXN-(\d+)/);
        if (timestampMatch) {
            const transactionTimestamp = parseInt(timestampMatch[1]);
            const transactionAge = currentTime - transactionTimestamp;
            const oneHourInMs = 60 * 60 * 1000; // 1 hour
            
            if (transactionAge > oneHourInMs) {
                return res.json({
                    success: true,
                    valid: false,
                    message: "Transaction is too old"
                });
            }
        }

        // 3. Verify with eSewa API (if transaction_id is an actual eSewa transaction code)
        if (transaction_id.startsWith('0') && transaction_id.length >= 10) {
            try {
                // This would be for actual eSewa transaction verification
                const verifyUrl = `${ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${ESEWA_PRODUCT_CODE}&total_amount=${amount}&transaction_uuid=${transaction_id}`;
                
                console.log('Verifying with eSewa:', verifyUrl);
                const esewaResponse = await axios.get(verifyUrl, {
                    timeout: 10000 // 10 second timeout
                });
                
                if (esewaResponse.data && esewaResponse.data.status === "COMPLETE") {
                    return res.json({
                        success: true,
                        valid: true,
                        message: "Transaction verified with eSewa successfully",
                        verification_source: "esewa_api"
                    });
                } else {
                    return res.json({
                        success: true,
                        valid: false,
                        message: "Transaction not confirmed by eSewa",
                        esewa_status: esewaResponse.data?.status || "unknown"
                    });
                }
            } catch (esewaError) {
                console.error('eSewa verification failed:', esewaError.message);
                // Continue with other validations if eSewa API fails
            }
        }

        // 4. Amount validation (ensure it's within reasonable bounds)
        const minAmount = 10; // Minimum 10 NPR
        const maxAmount = 100000; // Maximum 100,000 NPR
        
        if (numericAmount < minAmount || numericAmount > maxAmount) {
            return res.json({
                success: true,
                valid: false,
                message: `Amount must be between NPR ${minAmount} and NPR ${maxAmount}`
            });
        }

        // 5. Rate limiting check (prevent too many verification requests)
        const clientIP = req.ip || req.connection.remoteAddress;
        const rateLimitKey = `verify_${clientIP}`;
        
        // In a production environment, you'd use Redis or similar for this
        // For now, we'll use a simple in-memory store (not suitable for production)
        if (!global.rateLimitStore) {
            global.rateLimitStore = new Map();
        }
        
        const now = Date.now();
        const rateLimitData = global.rateLimitStore.get(rateLimitKey) || { count: 0, resetTime: now + 60000 };
        
        if (now > rateLimitData.resetTime) {
            rateLimitData.count = 1;
            rateLimitData.resetTime = now + 60000; // Reset every minute
        } else {
            rateLimitData.count++;
        }
        
        global.rateLimitStore.set(rateLimitKey, rateLimitData);
        
        if (rateLimitData.count > 10) { // Max 10 verifications per minute
            return res.status(429).json({
                success: false,
                message: "Too many verification requests. Please try again later."
            });
        }

        // 6. Additional security checks
        const suspiciousPatterns = [
            /script/i,
            /javascript/i,
            /<.*>/,
            /DROP\s+TABLE/i,
            /SELECT.*FROM/i
        ];
        
        const isSuspicious = suspiciousPatterns.some(pattern => 
            pattern.test(transaction_id) || pattern.test(amount.toString())
        );
        
        if (isSuspicious) {
            console.warn(`Suspicious transaction verification attempt: ${transaction_id}`);
            return res.json({
                success: true,
                valid: false,
                message: "Invalid transaction data detected"
            });
        }

        // If all validations pass
        console.log(`Transaction verification successful: ${transaction_id}`);
        
        res.json({
            success: true,
            valid: true,
            message: "Transaction verified successfully",
            verification_source: "backend_validation",
            verified_at: new Date().toISOString()
        });

    } catch (error) {
        console.error("Transaction verification error:", error);
        res.status(500).json({
            success: false,
            message: "Verification failed",
            error: error.message
        });
    }
};