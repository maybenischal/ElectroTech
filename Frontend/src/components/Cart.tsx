// src/Components/Cart.jsx
// Replace your existing Cart component with this updated version

import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getTotalPrice} = useCart();
    
    const handleBuy = async () => {
        try {
            const total = getTotalPrice();
            
            if (total <= 0) {
                alert("Cart is empty or invalid total amount");
                return;
            }

            // Call backend to initialize payment
            const response = await fetch("http://localhost:4000/api/payment/initialize-esewa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    total_amount: total,
                    // Optionally send cart items for backend validation
                    cart_items: items 
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Mark that payment is being initiated (for validation later)
                sessionStorage.setItem('payment_initiated', 'true');
                sessionStorage.setItem('payment_amount', total.toString());
                sessionStorage.setItem('payment_timestamp', Date.now().toString());
                
                // Create and submit form to eSewa
                const form = document.createElement("form");
                form.method = data.payment.method;
                form.action = data.payment.action;
                form.target = "_self"; // Navigate in same window

                // Add all form fields
                Object.entries(data.payment.fields).forEach(([key, value]) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = String(value); // Convert to string to fix TypeScript error
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit(); // This will redirect to eSewa
                
                // Clean up
                document.body.removeChild(form);
            } else {
                alert("Payment initialization failed: " + data.message);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment initialization failed. Please check your connection and try again.");
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-contain bg-gray-50 rounded"
                                />

                                <div className="flex-1">
                                    <Link
                                        to={`/product/${item.slug}`}
                                        className="font-semibold text-lg hover:text-orange-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    <p className="text-gray-600">NPR {item.price.toFixed(2)} each</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">NPR {(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/products"
                        className="block text-gray-600 hover:text-gray-800 border w-50 mt-2 p-2 rounded-md text-center font-[600] transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                <span>NPR {getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>NPR {getTotalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleBuy} 
                            className="w-full bg-[#60bb46] text-white py-3 rounded-lg hover:bg-[#4a9635] transition-colors mb-3 disabled:bg-gray-400"
                            disabled={items.length === 0}
                        >
                            Pay with eSewa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;