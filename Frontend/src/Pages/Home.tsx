import HomeBanner from "../components/HomeBanner";
import FeaturedProduct from "../components/FeaturedProducts";
import Features from "../components/Features";
import LatestProduct from "../components/LatestProduct";

const Home = () => {
    return (
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
    );
};

export default Home;