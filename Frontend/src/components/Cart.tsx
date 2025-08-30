import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const handleEpayPayment = () => {
        const total = getTotalPrice().toFixed(2);
        const orderId = 'ORDER_' + Date.now();

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://uat.esewa.com.np/epay/main';

        const inputs = [
            { name: 'tAmt', value: total },
            { name: 'amt', value: total },
            { name: 'psc', value: 0 },
            { name: 'pdc', value: 0 },
            { name: 'scd', value: 'EPAYTEST' },
            { name: 'pid', value: orderId },
            { name: 'su', value: 'http://localhost:4000/api/payment/success' },
            { name: 'fu', value: 'http://localhost:4000/api/payment/failure' },
        ];

        inputs.forEach(i => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = i.name;
            input.value = i.value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
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
                                    <p className="text-gray-600">${item.price.toFixed(2)} each</p>
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
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
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
                        className="block  text-gray-600 hover:text-gray-800 border w-50 mt-2 p-2 rounded-md text-center font-[600] transition-colors"
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
                                <span>{getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>Npr {getTotalPrice().toFixed(2)}</span>
                            </div>

                        </div>

                        <button onClick={handleEpayPayment} className="w-full bg-[#bd2b26] text-white py-3 rounded-lg hover:bg-[#ff6262] transition-colors mb-3">
                            Pay with Esewa
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;