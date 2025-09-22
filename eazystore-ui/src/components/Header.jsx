import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
   const navLinkClass = "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
    const[theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") === "dark" ? "dark" : "light";
    });


    useEffect(() => {
      if(theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);


    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        })
    };
    return (
        <header className="border-b border-gray-300 dark:border-gray-600 sticky-top top-0 z-20 bg-normalbg dark:bg-darkbg">
         <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
                <Link to="/" className={navLinkClass}>
                    <FontAwesomeIcon icon={faTags} className="h-8 w-8"/>
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
                                className={({isActive}) => {
                                     return isActive ? `${navLinkClass} underline` : `${navLinkClass}`
                                }}
                            >
                                    Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({isActive}) => {
                                     return isActive ? `${navLinkClass} underline` : `${navLinkClass}`
                                }}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contact"  
                                className={({isActive}) => {
                                     return isActive ? `${navLinkClass} underline` : `${navLinkClass}`
                                }}
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/login" 
                                 className={({isActive}) => {
                                     return isActive ? `${navLinkClass} underline` : `${navLinkClass}`
                                }}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/cart"
                                className={({isActive}) => {
                                     return isActive ? `${navLinkClass} underline` : `${navLinkClass}`
                                }}
                            >
                                <FontAwesomeIcon icon={faShoppingBasket} className="dark:text-light"/>
                            </NavLink>
                        </li>
                    </ul>
                </nav> 
            </div>
        </header>
        
    );
};

// export default Header;