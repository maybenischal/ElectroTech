// import HomeBanner from "../components/HomeBanner";
// import FeaturedProduct from "../components/FeaturedProducts";
// import Features from "../components/Features";
// import LatestProduct from "../components/LatestProduct";

// const Home = () => {
//     return (
//         <div>
//             <HomeBanner />
//             <FeaturedProduct />
//             {/* Laptop Offer Section */}
//             <div className="w-full flex justify-center px-2 py-4 mt-4 bg-[#eaeaea]">
//                 <div className="w-full md:w-[95%] flex flex-col md:flex-row items-center justify-center gap-6">
//                     <img
//                         src="https://mudita.com.np/media/laptop_offer.webp"
//                         alt="Laptop Offer"
//                         className="w-full md:w-1/2 object-contain rounded-sm"
//                     />
//                     <img
//                         src="https://mudita.com.np/media/40_-Off.webp"
//                         alt="40% Off"
//                         className="w-full md:w-1/2 object-contain rounded-sm"
//                     />
//                 </div>
//             </div>
//             <LatestProduct />
//             <Features />
//         </div>
//     );
// };

// export default Home;




import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import HomeBanner from "../components/HomeBanner";
import Features from "../components/Features";
import ProductCard from "../components/ProductCard";
import { getProductsData } from "../lib/api";
import { slugify } from "../utils/slugify";
import type { Product } from "../lib/types";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [paymentMessage, setPaymentMessage] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const navigate = useNavigate();

    // Handle payment success/failure messages
    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        const transactionId = searchParams.get('transaction_id');
        const amount = searchParams.get('amount');
        const error = searchParams.get('error');

        if (paymentStatus === 'success' && transactionId) {
            setPaymentMessage({
                type: 'success',
                message: `Payment successful! Transaction ID: ${transactionId}${amount ? `, Amount: NPR ${amount}` : ''}`
            });

            // Clear cart after successful payment (if you're using cart context)
            // clearCart(); // Uncomment if you have cart context

            // Clean up URL parameters after showing message
            setTimeout(() => {
                navigate('/', { replace: true });
                setPaymentMessage({ type: null, message: '' });
            }, 5000);

        } else if (paymentStatus === 'failed') {
            let errorMessage = 'Payment failed. Please try again.';

            switch (error) {
                case 'no_data':
                    errorMessage = 'Payment data not received. Please contact support.';
                    break;
                case 'invalid_signature':
                    errorMessage = 'Payment verification failed. Please contact support.';
                    break;
                case 'payment_incomplete':
                    errorMessage = 'Payment was not completed. Please try again.';
                    break;
                case 'payment_cancelled':
                    errorMessage = 'Payment was cancelled by user.';
                    break;
                case 'verification_failed':
                    errorMessage = 'Payment verification failed. Please contact support.';
                    break;
                default:
                    errorMessage = 'Payment failed. Please try again.';
            }

            setPaymentMessage({
                type: 'error',
                message: errorMessage
            });

            // Clean up URL parameters after showing message
            setTimeout(() => {
                navigate('/', { replace: true });
                setPaymentMessage({ type: null, message: '' });
            }, 7000);
        }
    }, [searchParams, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProductsData();

                if (Array.isArray(data)) {
                    const transformed = data.map((product) => ({
                        ...product,
                        id: product._id,
                    }));
                    setProducts(transformed);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setProducts([]);
                }
            } catch (err) {
                console.error("Failed to fetch products", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            {/* Payment Success/Failure Message */}
            {paymentMessage.type && (
                <div className={`w-full py-4 px-4 text-center ${paymentMessage.type === 'success'
                        ? 'bg-green-100 border border-green-400 text-green-700'
                        : 'bg-red-100 border border-red-400 text-red-700'
                    }`}>
                    <div className="container mx-auto">
                        <p className="font-medium">{paymentMessage.message}</p>
                        {paymentMessage.type === 'success' && (
                            <p className="text-sm mt-1">Thank you for your purchase! Your order has been processed.</p>
                        )}
                    </div>
                </div>
            )}

            <HomeBanner />


            {/* Laptop Offer Section */}
            <div className="w-full flex justify-center px-2 py-4 mt-4 bg-[#eaeaea]">
                <div className="w-full md:w-[95%] flex flex-col md:flex-row items-center justify-center gap-6">
                    <img
                        src="https://mudita.com.np/media/laptop_offer.webp"
                        alt="Laptop Offer"
                        className="w-full md:w-1/2 object-contain rounded-sm"
                    />
                    <img
                        src="https://mudita.com.np/media/40_-Off.webp"
                        alt="40% Off"
                        className="w-full md:w-1/2 object-contain rounded-sm"
                    />
                </div>
            </div>



            {/* Real Products Section */}
            <div className="w-[95%] mx-auto py-8">
                {/* Section title */}
                <div className="flex flex-col items-center mb-6">
                    <p className="text-2xl font-[600]">Our Products</p>
                    <div className="w-18 h-0.5 bg-orange-600 mt-1"></div>
                </div>

                {/* Loading state */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-lg text-gray-600">Loading products...</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-5">
                        {products.slice(0, 8).map((product) => (
                            <Link key={product.id} to={`/products/${slugify(product.name)}`}>
                                <ProductCard
                                    key={product.id}
                                    id={product.id.toString()}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    image={product.image}
                                />
                            </Link>
                        ))}
                    </div>
                )}

                {/* View All button (always visible) */}
                <div className="flex justify-center mt-6">
                    <Link
                        to="/products"
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                    >
                        View All Products
                    </Link>
                </div>
            </div>


            <Features />
        </div>
    );
};

export default Home;