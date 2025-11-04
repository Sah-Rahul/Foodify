import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">FoodiFy</h2>
          <p className="text-sm">
            Delicious food delivered to your door, fast and fresh — every time.
            Order your favorites and enjoy hassle-free dining.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-orange-500 transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:text-orange-500 transition">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@foodify.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +977 98111 22334
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Kathmandu, Nepal
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-500">
              <Facebook />
            </a>
            <a href="#" className="hover:text-orange-500">
              <Instagram />
            </a>
            <a href="#" className="hover:text-orange-500">
              <Twitter />
            </a>
            <a href="#" className="hover:text-orange-500">
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-orange-500">FoodiFy</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
