import { Home, LogIn, Menu, UserPlus, X } from "lucide-react";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaHeadset,
  FaSignOutAlt,
  FaTelegramPlane,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useUserStore();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const HaveId = user?.ID;
  const Navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout bosildi");
    logout();
    closeMenu();
    Navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.querySelector(".profile-menu");
      const profileSection = document.querySelector(".profile-section");
      if (
        profileMenu &&
        !profileMenu.contains(event.target) &&
        !profileSection.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-lg ">
      <div className="container mx-auto px-4 flex justify-between items-center h-20 ">
        {/* Menu toggle button on mobile */}
        <div className="block lg:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-black"
            initial={{ rotate: 0 }}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Logo */}
        <Link to={"/"} className="flex items-center group">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xl font-bold rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
            SM
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-blue-900 font-bold text-xl tracking-wide group-hover:text-blue-700 transition-colors duration-300">
              SMART-EXAM
            </span>
            <span className="text-blue-600 text-xs">Online Test Platform</span>
          </div>
        </Link>

        {/* Menu (visible on large screens) */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-8 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-300 group"
                onClick={closeMenu}
              >
                <span className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                  <Home className="w-4 h-4" />
                </span>
                <span className="ml-2">Bosh sahifa</span>
              </Link>
            </li>
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-300 group"
                  onClick={closeMenu}
                >
                  <span className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <FaTachometerAlt className="w-4 h-4" />
                  </span>
                  <span className="ml-2">Admin Dashboard</span>
                </Link>
              </li>
            )}
            {user?.role === "teacher" && HaveId && (
              <li>
                <Link
                  to="/create-test"
                  className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-300 group"
                  onClick={closeMenu}
                >
                  <span className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <FaClipboardList className="w-4 h-4" />
                  </span>
                  <span className="ml-2">Test Yaratish</span>
                </Link>
              </li>
            )}
            {user?.role === "admin" &&  (
              <li>
                <Link
                  to="/parents-profile"
                  className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-300 group"
                  onClick={closeMenu}
                >
                  <span className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <FaUser className="w-4 h-4" />
                  </span>
                  <span className="ml-2">Farzandim natijalari</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/contact"
                className="flex items-center text-blue-900 hover:text-blue-600 transition-colors duration-300 group"
                onClick={closeMenu}
              >
                <span className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                  <FaHeadset className="w-4 h-4" />
                </span>
                <span className="ml-2">Bog&apos;lanish</span>
              </Link>
            </li>
          </ul>

          {/* User profile or auth buttons */}
          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl px-4 py-2 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group"
                onClick={toggleProfile}
              >
                <img
                  className="w-8 h-8 rounded-lg shadow-lg ring-2 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all duration-300"
                  src="/fotouser.jpg"
                  alt="0"
                />
                <span className="text-blue-900 font-medium group-hover:text-blue-700">
                  {user.name}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border border-blue-100 profile-menu">
                  <div className="p-4 border-b border-blue-50">
                    <p className="text-sm text-blue-600 font-medium">
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/my-tests"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaClipboardList className="w-4 h-4 mr-3 text-blue-600" />
                        <span>Mening Testlarim</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://t.me/JR0525"
                        target="_blank"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaTelegramPlane className="w-4 h-4 mr-3 text-blue-600" />
                        <span>Xabar jonatish (Admin)</span>
                      </Link>
                    </li>
                    <li className="border-t border-gray-100">
                      <button
                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-300"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-3" />
                        <span>Chiqish</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="./signup" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <button className="relative flex items-center space-x-2 px-5 py-2.5 bg-white rounded-xl hover:bg-orange-50 transition-colors duration-300">
                  <UserPlus size={18} className="text-orange-600" />
                  <span className="text-orange-600 font-medium">
                    Ro&apos;yxatdan O&apos;tish
                  </span>
                </button>
              </Link>
              <Link to="/login" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <button className="relative flex items-center space-x-2 px-5 py-2.5 bg-white rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <LogIn size={18} className="text-blue-600" />
                  <span className="text-blue-600 font-medium">KIRISH</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (visible on small screens) */}
      <motion.div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-200`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <ul className="space-y-4 py-3 px-6 text-sm font-bold">
          {[
            {
              to: "/",
              text: "Bosh sahifa",
              icon: <Home className="w-4 h-4 mr-1" />,
            },
            ...(user?.role === "admin"
              ? [
                  {
                    to: "/admin-dashboard",
                    text: "Admin Dashboard",
                    icon: <FaTachometerAlt className="w-4 h-4 mr-1" />,
                  },
                ]
              : []),
            ...(user?.role === "teacher" && HaveId
              ? [
                  {
                    to: "/create-test",
                    text: "Test Yaratish",
                    icon: <FaClipboardList className="w-4 h-4 mr-1" />,
                  },
                ]
              : []),
            {
              to: "/contact",
              text: "Bog'lanish",
              icon: <FaHeadset className="w-4 h-4 mr-1" />,
            },
            {
              to: "/my-tests",
              text: "Mening Testlarim",
              icon: <FaClipboardList className="w-4 h-4 mr-2" />,
            },
            ...(user
              ? [
                  {
                    to: "/logout",
                    text: "Chiqish",
                    icon: (
                      <FaSignOutAlt className="w-4 h-4 mr-2 text-[#a83232]" />
                    ),
                    action: handleLogout,
                  },
                ]
              : []),
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={isMenuOpen ? { opacity: 0, y: 20 } : false}
              animate={
                isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                delay: isMenuOpen ? index * 0.1 : 0,
                type: "spring",
                stiffness: 300,
              }}
            >
              {item.action ? (
                <button
                  onClick={item.action}
                  className="flex items-center text-red-600 hover:text-red-700 w-full text-left rounded"
                >
                  {item.icon}
                  {item.text}
                </button>
              ) : (
                <Link
                  to={item.to}
                  className={`flex items-center text-black hover:text-blue-600 ${
                    item.to === "/logout" ? "text-[#a83232]" : ""
                  }`}
                  onClick={closeMenu} // Close the menu on click
                >
                  {item.icon}
                  {item.text}
                </Link>
              )}
            </motion.li>
          ))}
          {!user && (
            <>
              <li>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600"
                  onClick={closeMenu} // Menyuni yopish uchun qo'shildi
                >
                  Ro&apos;yxatdan O&apos;tish
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600"
                  onClick={closeMenu} // Menyuni yopish uchun qo'shildi
                >
                  Kirish
                </Link>
              </li>
            </>
          )}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
