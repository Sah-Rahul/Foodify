import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Sun, Moon, ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const admin = true;
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <h2 className="font-bold md:font-extrabold text-2xl text-gray-900 dark:text-white">
              FoodiFy
            </h2>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500"
            >
              Profile
            </Link>
            <Link
              to="/order"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500"
            >
              Order
            </Link>

            {admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer text-gray-700 dark:text-gray-200">
                    Dashboard
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link to="/admin/orders" className="block w-full">
                        Orders
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/admin/menu" className="block w-full">
                        Menu
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/admin/resturent" className="block w-full">
                        Restaurant
                      </Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              to="/profile"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              to="/login"
              className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col items-start gap-4 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <Link to="/order" onClick={() => setMenuOpen(false)}>
              Order
            </Link>

            {admin && (
              <>
                <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>
                  Admin Orders
                </Link>
                <Link to="/admin/menu" onClick={() => setMenuOpen(false)}>
                  Admin Menu
                </Link>
                <Link to="/admin/resturent" onClick={() => setMenuOpen(false)}>
                  Admin Restaurant
                </Link>
              </>
            )}

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
