import { NavLink } from "react-router-dom";
import CategoryPanel from "./CategoryPanel";
const Navbar = () => {
  return (
    <nav className="w-full ">
      <div className="w-full bg-white py-2">
        <div className="w-[95%]  m-auto flex justify-between items-center text-black">
          <CategoryPanel />

          {/*NavBar*/}
          <div className="col_2 flex items-center justify-center text-[16px] font-medium">
            <ul className="flex space-x-5">
              <NavLink to="/home">
                <li>Home</li>
              </NavLink>
              <NavLink to="/laptops">
                <li>Laptops</li>
              </NavLink>
              <NavLink to="/normallaptops">
                <li>Monitors</li>
              </NavLink>
              <NavLink to="/support">
                <li>Keyboard</li>
              </NavLink>
              <NavLink to="/mouse">
                <li>Mouse</li>
              </NavLink>
              <NavLink to="/support">
                <li>Accessories</li>
              </NavLink>
            </ul>
          </div>

          {/*Delivery*/}
          <div>
            <p className="text-[14px] font-[500]">
              Free Delivery inside the valley
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
