import { Link, useNavigate } from "react-router-dom";
import NavMenu from "./menu/nav.menu";

const Header = () => {
  return (
    <nav className="bg-white z-50 relative  shadow-sm">
      <div className=" container  mx-auto flex items-center h-14 space-x-6 	">
        <div className="text-primary-500 flex h-full items-center ">
          <Link to="/" className="text-lg font-semibold">
            <img
              src="assets/images/app-logo.png"
              alt="fullstack-auth"
              className="w-32 mx-auto"
            />
          </Link>
        </div>
        <div className=" flex flex-grow h-full items-center justify-end space-x-6">
          <NavMenu navigate={useNavigate()} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
