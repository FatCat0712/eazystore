import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faMoon,
  faSun,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, UNSAFE_useScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

export default function Header() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
  
  const dropdownLinkClass = 
    "block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600";

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const isAdmin = true;
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

  const { totalQuantity } = useCart();
  const {isAuthenticated,user, logout} = useAuth();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setAdminMenuOpen(false);
    setUserMenuOpen(false);

    const handleClickOutside = (event) => {
      if(userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);


  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handleLogout= (e) => {
    e.preventDefault();
    logout();
    toast.success("Logged out successfully");
    navigate("/home");
  }

  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky-top top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <Link to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Stickers</span>
        </Link>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full boder border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Togge theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 dark:text-light text-primary"
            />
          </button>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/home"
                // className="text-center text-lg font-primary font-semibold text-primary"
                className={({ isActive }) => {
                  return isActive
                    ? `${navLinkClass} underline`
                    : `${navLinkClass}`;
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => {
                  return isActive
                    ? `${navLinkClass} underline`
                    : `${navLinkClass}`;
                }}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => {
                  return isActive
                    ? `${navLinkClass} underline`
                    : `${navLinkClass}`;
                }}
              >
                Contact
              </NavLink>
            </li>
            <li>
              {isAuthenticated ?
              (<div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="relative text-primary"
                  >
                    <span className={navLinkClass}>
                      {
                        `Hello ${user.name.length > 5 ? `${user.name.slice(0,5)}...` : user.name}`
                      }
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-primary dark:text-light w-6 h-6"
                    />
                  </button>
                  {
                    isUserMenuOpen && (
                      <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                          <ul className="py-2">
                            <li>
                              <Link to="/profile" className={dropdownLinkClass}>
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link to="/orders" className={dropdownLinkClass}>
                                Orders
                              </Link>
                            </li>
                            {isAdmin && (
                               <li>
                              <button
                                onClick={toggleAdminMenu}
                                className={`${dropdownLinkClass} flex items-center justify-between`}
                              >
                                Admin
                                <FontAwesomeIcon icon={faAngleDown} />
                              </button>
                              {
                                isAdminMenuOpen && 
                                (
                                  <ul className="ml-4 mt-2 space-y-2">
                                    <li>
                                      <Link
                                        to="/admin/orders"
                                        className={dropdownLinkClass}
                                      >
                                        Orders
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="/admin/messages"
                                        className={dropdownLinkClass}
                                      >
                                        Messages
                                      </Link>
                                    </li>
                                  </ul>
                                )
                              }
                            </li>
                            )}
                          
                            <li>
                              <Link
                                to="/home"
                                onClick={handleLogout}
                                className={dropdownLinkClass}
                              >
                                Logout
                              </Link>
                            </li>
                          </ul>
                      </div>
                    )
                  }
                   
                </div>)  
              :  (<NavLink
                to="/login"
                className={({ isActive }) => {
                  return isActive
                    ? `${navLinkClass} underline`
                    : `${navLinkClass}`;
                }}
              >
                Login
              </NavLink>)
              }
             
            </li>
            <li>
              <Link to="/cart" className="relative dark:text-light">
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className="text-primary dark:text-light w-6"
                />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// export default Header;
