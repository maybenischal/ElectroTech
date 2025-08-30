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
    
    const transactionId = searchParams.get('transaction_id');
    const amount = searchParams.get('amount');

    useEffect(() => {
        // Clear cart on successful payment
        clearCart();
        
        // Show toast notification
        setShowToast(true);
        
        // Redirect to home page immediately after 1.5 seconds
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 1500);

        return () => clearTimeout(redirectTimer);
    }, [clearCart, navigate]);

    const handleCloseToast = () => {
        setShowToast(false);
    };

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
                        <p className="text-sm text-blue-700">
                            Redirecting to home page...
                        </p>
                    </div>
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