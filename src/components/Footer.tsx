import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black">
            Electro<span className="text-red-600">Tech</span>
          </h1>
          <p className="mt-2 text-sm">
            <span className="font-[600]">ElectroTech </span> is Nepal’s premier
            online store specializing exclusively in the latest and most
            advanced tech products. From high-performance laptops and desktops
            to accessories, gadgets, and hardware, we bring together the widest
            selection for gamers, professionals, creators, and everyday users.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-2">Company</h2>
            <ul className="text-sm space-y-1">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-2">Get in touch</h2>
            <div className="text-sm space-y-1">
              <p>9807079643</p>
              <p>contact@electrotech.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © ElectroTech All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
