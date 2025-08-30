import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import HomeBanner from "../components/HomeBanner";
import FeaturedProduct from "../components/FeaturedProducts";
import Features from "../components/Features";
import LatestProduct from "../components/LatestProduct";

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

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const { clearCart } = useCart();

    // Check for payment success - simple version
    useEffect(() => {
        const success = searchParams.get('success');
        
        if (success === '1') {
            // Clear cart on successful payment
            clearCart();
            
            // Show success toast
            setShowToast(true);
            
            // Clean URL
            setSearchParams({});
            
            // Auto-hide toast after 5 seconds
            const toastTimer = setTimeout(() => {
                setShowToast(false);
            }, 5000);

            return () => clearTimeout(toastTimer);
        }
    }, [searchParams, setSearchParams, clearCart]);

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <Toast 
                    message="Payment Successful! Your order has been confirmed." 
                    type="success" 
                    onClose={handleCloseToast}
                />
            )}
            
            {/* Your existing home page content */}
            <div>
                <HomeBanner />
                <FeaturedProduct />
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
                <LatestProduct />
                <Features />
            </div>
        </>
    );
};

export default Home;