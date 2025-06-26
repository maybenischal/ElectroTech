import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
        <NavLink to="/about" className="text-[#60768a] text-base font-normal leading-normal min-w-40">
          About Us
        </NavLink>
        <a
          className="text-[#60768a] text-base font-normal leading-normal min-w-40"
          href="#"
        >
          Contact
        </a>
        <a
          className="text-[#60768a] text-base font-normal leading-normal min-w-40"
          href="#"
        >
          Support
        </a>
        <a
          className="text-[#60768a] text-base font-normal leading-normal min-w-40"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-[#60768a] text-base font-normal leading-normal min-w-40"
          href="#"
        >
          Terms of Service
        </a>
      </div >
      <p>
        <div className="text-center text-[#60768a]  bg-blue-950 text-base font-normal leading-normal mt-4">
          &copy; 2021-{new Date().getFullYear()} ElectroTech All rights
          reserved.
        </div>
      </p>
    </div >
  );
};

export default Footer;
