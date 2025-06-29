import { CornerDownLeft, Headphones, Laptop, Truck } from "lucide-react";
import HomeBanner from "../components/HomeBanner";
import LaptopSlider from "../components/LaptopSlider";
import FeaturedProduct from "../components/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <HomeBanner />

      {/*Features of Website*/}
      <div className="flex flex-row gap-10 m-4 items-center justify-center bg-gray-100 px-4">
        <div className="h-48 flex flex-col items-center justify-center text-lg rounded-lg">
          <Truck className="w-10 h-10 mr-2" />
          Free Shipping All Over Nepal
        </div>
        <div className="h-48 flex flex-col items-center justify-center text-lg rounded-lg">
          <CornerDownLeft className="w-10 h-10 mr-2" />
          Easy Returns
        </div>
        <div className="h-48 flex flex-col items-center justify-center text-lg rounded-lg">
          <Headphones className="w-10 h-10 mr-2" />
          24/7 Customer Support
        </div>
      </div>
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

      <LaptopSlider />
    </div>
  );
};

export default Home;
