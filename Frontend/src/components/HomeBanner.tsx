const HomeBanner = () => {
  return (
    <div className="w-[95%] mx-auto py-8">
      {/* Top Section: iPad Pro and PS5 */}
      <div className=" w-full flex flex-col md:flex-row gap-6 mb-6">
        {/* iPad Pro Promotion Card */}
        <div
          className="relative flex-1 bg-white rounded-lg shadow-xl overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center p-6 md:p-10"
          style={{
            backgroundImage: `url('https://placehold.co/1200x800/222222/eeeeee?text=iPad+Pro+M4')`,
            backgroundSize: "cover",
            // backgroundPosition: 'center'
          }}
        >
          {/* Gradient Overlay for readability using Tailwind's pseudo-elements and gradients */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="relative z-10 text-white flex flex-col items-start">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              iPad M4 Pro
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Power Like Never Before
            </h1>
            <p className="text-sm sm:text-base mb-6 max-w-md">
              The ultimate iPad experience with the most advanced technology.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              BUY NOW
            </a>
          </div>

          {/* Pagination Dots (example) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            <span className="w-3 h-3 bg-white rounded-full opacity-60"></span>
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="w-3 h-3 bg-white rounded-full opacity-60"></span>
            <span className="w-3 h-3 bg-white rounded-full opacity-60"></span>
          </div>
        </div>

        {/* PS5 Promotion Card */}
        <div
          className="relative flex-1 md:max-w-sm lg:max-w-md bg-white rounded-lg shadow-xl overflow-hidden min-h-[300px] flex flex-col justify-center items-center text-center p-6"
          style={{
            backgroundImage: `url('https://placehold.co/800x1000/000000/ffffff?text=PlayStation+5')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark Overlay for readability using Tailwind */}
          <div className="absolute inset-0 rounded-lg bg-black/50"></div>

          {/* "PICK" Badge */}
          <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            PICK
          </span>

          <div className="relative z-10 text-white">
            <img
              src="https://placehold.co/100x30/000000/ffffff?text=PS5_Logo"
              alt="PlayStation 5 Logo"
              className="mx-auto mb-4 h-8 object-contain"
            />
            <h2 className="text-2xl font-bold mb-1">Sony PlayStation 5</h2>
            <p className="text-base mb-6">Slim Disc Console</p>
            <a
              href="#"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              GET YOURS TODAY
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: PC Build, MacBook Deals, Lenovo Legion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* PC Build Promotion Card */}
        <div className="flex flex-col justify-center items-center text-center bg-yellow-50 rounded-lg shadow-xl p-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
            Your ultimate
            <br />
            build starts here!
          </h2>
          <p className="text-gray-600 mb-6 max-w-sm">
            Get the best components for your dream PC.
          </p>
          <a
            href="#"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            BUILD NOW!
          </a>
        </div>

        {/* MacBook Special Deals Card */}
        <div
          className="relative bg-white rounded-lg shadow-xl overflow-hidden min-h-[250px] flex flex-col justify-end p-6"
          style={{
            backgroundImage: `url('https://placehold.co/800x500/cccccc/333333?text=MacBook')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay to make text pop */}
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

          {/* "DEALS" Badge */}
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            DEALS Special
          </span>

          <div className="relative z-10 text-white flex flex-col items-start">
            <img
              src="https://placehold.co/80x25/ffffff/000000?text=MacBook_Logo"
              alt="MacBook Logo"
              className="mb-2 h-6 object-contain"
            />
            <h2 className="text-xl font-bold mb-2">Special Deals</h2>
            <p className="text-sm">
              Get your hands on the MacBook Pro M4 with unbeatable deals.
            </p>
          </div>
        </div>

        {/* Lenovo Legion AI-Powered Gaming PC Card */}
        <div
          className="relative bg-white rounded-lg shadow-xl overflow-hidden min-h-[250px] flex flex-col justify-end p-6"
          style={{
            backgroundImage: `url('/Images/Banner1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay to make text pop */}
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

          {/* "NEW ARRIVAL" Badge */}
          <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            NEW ARRIVAL
          </span>

          <div className="relative z-10 text-white flex flex-col items-start">
            <img
              src="Images/LenovoLogo.png"
              // alt="Lenovo Logo"
              className="mb-2 h-6 object-contain"
            />
            <h3 className="text-xl font-bold mb-2">Legion 7i 6i RX9</h3>
            <p className="text-sm">AI-Powered Gaming PC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
