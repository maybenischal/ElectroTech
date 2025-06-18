import { CornerDownLeft, Headphones, Ship, Truck } from "lucide-react";
import HomeBanner from "../components/HomeBanner";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <div className="flex flex-row gap-10 m-4 items-center justify-center bg-gray-100 px-4">
        <div className="h-48 flex  flex-col items-center justify-center text-lg rounded-lg">
          <Truck className="w-10 h-10 mr-2" />
          Free Shipping All Over Nepal
        </div>
        <div className="h-48 flex  flex-col items-center justify-center text-lg rounded-lg">
          <CornerDownLeft className="w-10 h-10 mr-2" />
          Easy Returns
        </div>
        <div className="h-48 flex  flex-col items-center justify-center text-lg rounded-lg">
          <Headphones className="w-10 h-10 mr-2" />
          24/7 Customer Support
        </div>
      </div>
    </div>
  );
};

export default Home;
