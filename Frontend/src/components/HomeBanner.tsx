const HomeBanner = () => {
  return (
    <div className="w-[95%] mx-auto py-8">
      <div
        className="relative bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: `url('/Images/modernlaptop.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Black gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 rounded-lg"></div>

        {/* Center Text */}
        <div className="relative z-10 text-center">
              <h1 className="text-8xl font-extrabold text-white px-1 sm:px-2">
              Electro<span className="text-red-600">Tech</span>
            </h1>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;