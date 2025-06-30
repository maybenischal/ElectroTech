import { Truck, CornerDownLeft, Headphones } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <Truck className="w-8 h-8 text-gray-700" />,
            title: "Free Shipping",
            description: "All Over Nepal",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        },
        {
            icon: <CornerDownLeft className="w-8 h-8 text-gray-700" />,
            title: "Easy Returns",
            description: "Hassle-free process",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        },
        {
            icon: <Headphones className="w-8 h-8 text-gray-700" />,
            title: "24/7 Support",
            description: "Always here to help",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        }
    ];

    return (
        <div className="py-12 px-4 mt-8 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-row gap-8 justify-center items-stretch">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-opacity-60 group flex-1 min-w-0`}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;