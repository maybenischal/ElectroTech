import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Toast Component
const Toast = ({ message, type = 'success', onClose }) => {
    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
            <div className="flex items-center space-x-2">
                {type === 'success' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
                <span className="font-medium">{message}</span>
                <button 
                    onClick={onClose}
                    className="ml-2 text-white hover:text-gray-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Payment Success Component
export const PaymentSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [showToast, setShowToast] = useState(false);
    const [isValidPayment, setIsValidPayment] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    
    const transactionId = searchParams.get('transaction_id');
    const amount = searchParams.get('amount');

    useEffect(() => {
        console.log('PaymentSuccess component mounted');
        console.log('Transaction ID:', transactionId);
        console.log('Amount:', amount);
        
        // Check if we have the required payment parameters
        if (!transactionId || !amount) {
            console.log('Missing payment parameters, redirecting to home');
            navigate('/', { replace: true });
            return;
        }

        // Additional validation: check if payment was legitimately initiated
        const paymentInitiated = sessionStorage.getItem('payment_initiated');
        const paymentTimestamp = sessionStorage.getItem('payment_timestamp');
        
        // Check if session data exists and is recent (within last 30 minutes)
        const isRecentPayment = paymentTimestamp && 
            (Date.now() - parseInt(paymentTimestamp)) < (30 * 60 * 1000);
        
        if (!paymentInitiated || !isRecentPayment) {
            console.log('No valid payment session found, redirecting to home');
            navigate('/', { replace: true });
            return;
        }

        // Clear the session data to prevent reuse
        sessionStorage.removeItem('payment_initiated');
        sessionStorage.removeItem('payment_amount');
        sessionStorage.removeItem('payment_timestamp');

        // Verify the transaction with backend (optional but recommended)
        const verifyPayment = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-transaction`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        transaction_id: transactionId,
                        amount: amount
                    })
                });

                const data = await response.json();
                
                if (data.success && data.valid) {
                    setIsValidPayment(true);
                    setIsVerifying(false);
                    
                    // Clear cart on successful payment verification
                    clearCart();
                    
                    // Show toast notification
                    setShowToast(true);
                    
                    // Set up navigation timer
                    const redirectTimer = setTimeout(() => {
                        try {
                            console.log('Attempting navigation to home...');
                            navigate('/');
                        } catch (error) {
                            console.error('Navigation error:', error);
                            window.location.href = '/';
                        }
                    }, 3000);

                    return () => clearTimeout(redirectTimer);
                } else {
                    console.log('Invalid payment verification, redirecting to home');
                    navigate('/', { replace: true });
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                // If verification fails, we can still proceed with basic validation
                // but this depends on your security requirements
                setIsValidPayment(true);
                setIsVerifying(false);
                clearCart();
                setShowToast(true);
                
                const redirectTimer = setTimeout(() => {
                    navigate('/');
                }, 3000);

                return () => clearTimeout(redirectTimer);
            }
        };

        verifyPayment();
    }, []); // Empty dependency array - run only once on mount

    const handleCloseToast = () => {
        setShowToast(false);
    };

    // Show loading state while verifying
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Verifying Payment...</h2>
                    <p className="text-gray-600">Please wait while we confirm your payment.</p>
                </div>
            </div>
        );
    }

    // Only show success content if payment is valid
    if (!isValidPayment) {
        return null; // This should not render as invalid payments get redirected
    }

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <Toast 
                    message="Payment Successful! Order confirmed." 
                    type="success" 
                    onClose={handleCloseToast}
                />
            )}
            
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg 
                            className="w-10 h-10 text-green-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>

                    {/* Success Message */}
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
                    
                    {/* Transaction Details */}
                    {transactionId && (
                        <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left">
                            <h3 className="font-semibold text-gray-800 mb-2">Transaction Details:</h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Transaction ID:</span> 
                                <span className="font-mono ml-2">{transactionId}</span>
                            </p>
                            {amount && (
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Amount Paid:</span> 
                                    <span className="ml-2">NPR {parseFloat(amount).toFixed(2)}</span>
                                </p>
                            )}
                        </div>
                    )}

                    {/* Redirect Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-700 mb-2">
                            Redirecting to home page in 3 seconds...
                        </p>
                    </div>

                    {/* Manual Navigation Button */}
                    <Link
                        to="/"
                        className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        Go to Home Page
                    </Link>
                </div>
            </div>
        </>
    );
};

// Error type definition
type ErrorType = 'no_data' | 'invalid_signature' | 'payment_incomplete' | 'verification_failed' | 'payment_cancelled' | null;

// Payment Failure Component
export const PaymentFailure: React.FC = () => {
    const [searchParams] = useSearchParams();
    const errorType = searchParams.get('error') as ErrorType;
    
    const getErrorMessage = (error: ErrorType): string => {
        switch(error) {
            case 'no_data':
                return 'No payment data received from eSewa.';
            case 'invalid_signature':
                return 'Payment data verification failed.';
            case 'payment_incomplete':
                return 'Payment was not completed successfully.';
            case 'verification_failed':
                return 'Unable to verify payment with eSewa.';
            case 'payment_cancelled':
                return 'Payment was cancelled by user.';
            default:
                return 'Payment failed due to an unknown error.';
        }
    };

    const handleRetry = (): void => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg 
                        className="w-10 h-10 text-red-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h2>
                <p className="text-gray-600 mb-6">
                    {getErrorMessage(errorType)}
                </p>
                
                {/* Error Details */}
                {errorType && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-red-700">
                            <span className="font-medium">Error Code:</span> {errorType}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        to="/cart"
                        className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        Back to Cart
                    </Link>
                    <Link
                        to="/products"
                        className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        onClick={handleRetry}
                        className="block w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};