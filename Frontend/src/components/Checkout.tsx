import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, User, Mail } from 'lucide-react';

const Checkout: React.FC = () => {
    const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
    const { user, isAuthenticated } = useAuth();
    
    // Guest user form state
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: ''
    });
    
    const [isProcessing, setIsProcessing] = useState(false);
    const showGuestForm = !isAuthenticated;

    const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuestInfo({
            ...guestInfo,
            [e.target.name]: e.target.value
        });
    };

    const validateGuestInfo = () => {
        if (!showGuestForm) return true; // User is logged in
        
        if (!guestInfo.name.trim()) {
            alert('Please enter your name');
            return false;
        }
        
        if (!guestInfo.email.trim()) {
            alert('Please enter your email');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(guestInfo.email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    };

    const handleCheckout = async () => {
        if (!validateGuestInfo()) {
            return;
        }
        
        setIsProcessing(true);
        
        try {
            const total = getTotalPrice();
            
            if (total <= 0) {
                alert("Cart is empty or invalid total amount");
                setIsProcessing(false);
                return;
            }

            // Prepare customer info
            const customerInfo = isAuthenticated ? {
                name: user?.name || '',
                email: user?.email || '',
                userId: user?.id || null
            } : {
                name: guestInfo.name,
                email: guestInfo.email,
                userId: null
            };

            // Call backend to initialize payment
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/initialize-esewa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    total_amount: total,
                    cart_items: items,
                    customer_info: customerInfo
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Store all necessary data in session for order creation after payment
                sessionStorage.setItem('cart_items', JSON.stringify(items));
                sessionStorage.setItem('cart_total', total.toString());
                sessionStorage.setItem('customer_info', JSON.stringify(customerInfo));
                
                // Mark that payment is being initiated (for validation later)
                sessionStorage.setItem('payment_initiated', 'true');
                sessionStorage.setItem('payment_amount', total.toString());
                sessionStorage.setItem('payment_timestamp', Date.now().toString());
                
                // Create and submit form to eSewa
                const form = document.createElement("form");
                form.method = data.payment.method;
                form.action = data.payment.action;
                form.target = "_self";

                // Add all form fields
                Object.entries(data.payment.fields).forEach(([key, value]) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = String(value);
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
                
                // Clean up
                document.body.removeChild(form);
            } else {
                alert("Payment initialization failed: " + data.message);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment initialization failed. Please check your connection and try again.");
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
                    <Link
                        to="/products"
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <Link 
                    to="/cart" 
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                    ← Back to Cart
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                                <img 
                                    src={item.image[0]} 
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm">{item.name}</h3>
                                    <p className="text-gray-600">NPR {item.price}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:bg-gray-200 rounded"
                                        disabled={isProcessing}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:bg-gray-200 rounded"
                                        disabled={isProcessing}
                                    >
                                        <Plus size={16} />
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
                                        disabled={isProcessing}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <span className="font-medium">NPR {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total: NPR {getTotalPrice().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Information & Payment */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                    
                    {isAuthenticated ? (
                        /* Logged in user info */
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-2 text-green-700 mb-2">
                                <User size={20} />
                                <span className="font-medium">Logged in as:</span>
                            </div>
                            <p className="text-gray-700 ml-6">{user?.name}</p>
                            <p className="text-gray-700 ml-6">{user?.email}</p>
                        </div>
                    ) : (
                        /* Guest user form */
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-2 text-gray-700 mb-4">
                                <User size={20} />
                                <span className="font-medium">Guest Checkout</span>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={guestInfo.name}
                                        onChange={handleGuestInfoChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                        disabled={isProcessing}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={guestInfo.email}
                                            onChange={handleGuestInfoChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your email address"
                                            disabled={isProcessing}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <Link 
                                    to="/login" 
                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                >
                                    Already have an account? Login here
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Payment Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-gray-700 mb-4">
                            <CreditCard size={20} />
                            <span className="font-medium">Payment Method</span>
                        </div>
                        
                        <div className="border border-gray-300 rounded-lg p-3 mb-4">
                            <div className="flex items-center">
                                <input type="radio" id="esewa" name="payment" defaultChecked disabled />
                                <label htmlFor="esewa" className="ml-2 flex items-center">
                                    <img 
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" 
                                        alt="eSewa" 
                                        className="w-8 h-6 mr-2" 
                                    />
                                    eSewa Digital Wallet
                                </label>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 ml-6">
                                Secure payment via eSewa digital wallet
                            </p>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                                isProcessing 
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {isProcessing ? 'Processing...' : `Pay NPR ${getTotalPrice().toFixed(2)} with eSewa`}
                        </button>
                        
                        <p className="text-xs text-gray-500 text-center mt-3">
                            By proceeding, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;