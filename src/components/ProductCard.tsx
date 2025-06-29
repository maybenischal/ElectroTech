import { Heart, Star, StarHalf } from "lucide-react";
import { Button } from "./ui/button";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  rating?: number;
  description?: string;
};

const ProductCard = ({
  name,
  price,
  image,
  rating = 0,
  description,
}: ProductCardProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="relative bg-white w-76 p-4 flex flex-col items-start gap-3 rounded-md hover:shadow-lg transition-all">
      {/* 👇 Gray background behind image */}
      <div className="w-full h-50 bg-[#f2f2f3] rounded-md flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="h-full object-contain" />
      </div>

      <div className="w-full flex flex-col items-start">
        <h3 className="text-[18px] font-[600] text-gray-800 truncate">
          {name}
        </h3>
        <p className="text-gray-400 text-[12px] line-clamp-2 leading-tight">
          {description}
        </p>

        <div className="flex items-center gap-[1px] mt-1">
          {[...Array(fullStars)].map((_, i) => (
            <Star
              key={`full-${i}`}
              className="w-3 h-3 text-yellow-500 fill-yellow-500"
            />
          ))}
          {hasHalfStar && (
            <StarHalf className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
          ))}
          <span className="text-gray-600 text-xs ml-1">
            ({rating.toFixed(1)})
          </span>
        </div>
        <div className="flex justify-between gap-8">
          <p className="text-base font-bold mt-1">${price.toFixed(2)}</p>
          <Button variant={"outline"} size={"sm"} className="px-2 ">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
