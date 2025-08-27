import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import logo from "../assets/ILN Logo v2.png";
// import logo1 from "../assets/ILN_logo-01.png";
import logo from "../assets/ILN Logo v2.png";
import { useLocation } from "react-router-dom";
import JoinFormPopup from "./JoinForm";
// import { SiX } from "react-icons/si";
import LanguageSelector from "./LanguageSelector";
import { BadgeCheck, LogOut, User } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return sessionStorage.getItem("theme") === "dark";
  });

  const location = useLocation();

  const [user, setUser] = useState<{
    name: string;
    email: string;
    companyName: string;
    memberId: string;
    logo: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // console.log(user);
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      sessionStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      sessionStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const loadGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    loadGoogleTranslateScript();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full font-['PT_Serif'] transition-colors bg-white text-[var(--secondary-color)] dark:bg-[var(--secondary-color)] dark:text-white">
      {/* Mini Navbar */}

      <div className=" bg-gray-100 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-300 py-2 ">
        <div className="w-11/12 mx-auto flex justify-end md:justify-between items-center gap-6 md:px-5">
          <div className="hidden md:flex items-center gap-2">
            <FaEnvelope className="text-lg" />
            <a
              href="mailto:info@integratedlognet.com"
              className="hover:underline"
            >
              info@integratedlognet.com
            </a>
          </div>
          <div className="flex gap-5">
            <div className="notranslate">
              <LanguageSelector />
            </div>

            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors text-xl"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors text-xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-11/12 mx-auto flex justify-between items-center md:px-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <img src={logo} alt="Logo" className="w-64 md:w-80 dark:invert" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-md items-center relative">
          {/* Links before Membership */}
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/About" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-[var(--primary-color)]"
                  : "text-inherit"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Membership Dropdown */}
          <div className="relative group">
            <span
              className={`cursor-pointer ${
                location.pathname.startsWith("/membership")
                  ? "text-[var(--primary-color)]"
                  : "text-inherit"
              }`}
            >
              Membership ▾
            </span>
            <div className="absolute hidden group-hover:flex flex-col bg-white text-black shadow-lg rounded w-44 z-10">
              <a
                href="/membership"
                className="px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
              >
                Membership
              </a>
              <a
                href="/become-a-member"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Expression of Interest
              </a>
            </div>
          </div>

          {/* Remaining Links */}
          {[
            { label: "Newsfeed", path: "/newsfeed" },
            { label: "Blogs", path: "/blogs" },
            { label: "Contact", path: "/contact" },
            ...(user
              ? [
                  { label: "Directory", path: "/directory" },
                  { label: "AGM", path: "/agm" },
                ]
              : []),
          ].map((link) => (
            <a
              key={link.label}
              href={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-[var(--primary-color)]"
                  : "text-inherit"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-full "
          >
            {darkMode ? (
              <FaSun className="text-white" />
            ) : (
              <FaMoon className="text-[var(--secondary-color)]" />
            )}
          </button>
          {user ? (
            <div className="relative group">
              <div className="w-10 h-10 rounded-full border p-1 text-white flex items-center justify-center font-bold text-lg cursor-pointer">
                <img src={user.logo} alt={user.companyName} />
              </div>
              {/* Hover logout menu */}
              <div className="absolute hidden group-hover:flex flex-col top-10 left-0 bg-white dark:bg-black text-[var(--secondary-color)] dark:text-white shadow-lg rounded w-36 z-50">
                <p className="px-4 py-2 text-sm border-b border-gray-200 dark:border-white/20">
                  {user.companyName || user.email.split("@")[0]}
                  {user.memberId && (
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4" />
                      Member ID: {user.memberId}
                    </div>
                  )}
                </p>

                {/* Profile */}
                <button
                  onClick={() => (window.location.href = "/profile")}
                  className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 text-left border-b border-gray-200 dark:border-white/20 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-tl-2xl rounded-br-2xl">
              <a href="/Login">Sign in</a>
            </button>
          )}

          <button
            className="text-2xl text-[var(--primary-color)] dark:text-white"
            onClick={() => setMenuOpen(true)}
          >
            &#9776;
          </button>
        </div>

        {/* Mobile Hamburger */}
        {/* Mobile Dark/Light Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full"
          >
            {darkMode ? (
              <FaSun className="text-white text-xl" />
            ) : (
              <FaMoon className="text-[var(--secondary-color)] text-xl" />
            )}
          </button>
          <button
            className="text-2xl text-[var(--secondary-color)] dark:text-white"
            onClick={() => setMenuOpen(true)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* Overlay Background Blur */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      {menuOpen && (
        <div
          className={`fixed top-0 right-0 ${
            isMobile ? "w-full" : "w-1/3"
          } h-full z-50 overflow-y-auto p-6 bg-white dark:bg-[var(--secondary-color)]`}
        >
          {/* Close + Logo in Mobile */}
          {isMobile && (
            <div className="flex justify-between items-center">
              <a href="/">
                <img src={logo} alt="Logo" className="w-60 dark:invert" />
              </a>
              <IoClose
                className="text-3xl text-[var(--secondary-color)] dark:text-white"
                onClick={() => setMenuOpen(false)}
              />
            </div>
          )}

          <div className={`mt-10 ${isMobile ? "" : "space-y-6"}`}>
            {isMobile ? (
              <>
                {user && (
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-[var(--primary-color)] dark:text-white">
                      <img
                        src={user.logo}
                        alt={user.companyName}
                        className="w-24"
                      />
                      {user.companyName?.split(" ")[0] ||
                        user.email.split("@")[0]}
                    </p>
                    {user.memberId && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Member ID: {user.memberId}
                      </p>
                    )}
                  </div>
                )}

                {[
                  "Home",
                  "About",
                  "Membership",
                  "Newsfeed",
                  "Blogs",
                  "Contact",
                  ...(user ? ["Directory", "AGM", "Profile"] : []), // Conditionally add AGM
                ].map((item) => (
                  <a
                    key={item}
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="block py-2 text-[var(--primary-color)] dark:text-white"
                  >
                    {item}
                  </a>
                ))}

                <div className="flex gap-5">
                  {user ? (
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null); // Update state immediately
                        window.location.href = "/";
                      }}
                      className="mt-6 bg-white text-[var(--primary-color)] border border-[var(--primary-color)] px-6 py-2 rounded-tl-2xl rounded-br-2xl"
                    >
                      Logout
                    </button>
                  ) : (
                    <a href="/login">
                      <button className="mt-6 bg-white text-[var(--primary-color)] border border-[var(--primary-color)] px-6 py-2 rounded-tl-2xl rounded-br-2xl">
                        Sign In
                      </button>
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl mb-4 text-black dark:text-white">
                  About:
                </h1>
                <p className="text-md leading-relaxed mb-6">
                  The Integrated Logistics Network (ILN) connects global
                  logistics professionals, offering a vetted directory, secure
                  messaging, events, and exclusive resources. It enables
                  networking, partnership building, and access to insights that
                  drive growth, efficiency, and global business expansion.
                </p>
                <div className="flex gap-5">
                  <div className="relative inline-block">
                    <div className="absolute top-1 left-1 w-full h-full bg-[var(--primary-color)] opacity-30 rounded z-0" />
                    <a href="/contact">
                      <button className="relative z-10 text-white bg-[var(--primary-color)] px-6 py-2 font-semibold rounded">
                        Contact Us
                      </button>
                    </a>
                  </div>
                  {!user && (
                    <div className="relative inline-block">
                      <div className="absolute top-1 left-1 w-full h-full bg-[var(--primary-color)] opacity-30 rounded z-0" />
                      <button
                        onClick={() => setShowForm(true)}
                        className="relative z-10 text-white bg-[var(--primary-color)] px-6 py-2 font-semibold rounded"
                      >
                        Become a Member
                      </button>
                    </div>
                  )}
                </div>

                <hr className="border-black/30 dark:border-white/30 my-6" />

                <div>
                  <h3 className="text-3xl mb-4 text-black dark:text-white">
                    We Are Social:
                  </h3>
                  <div className="flex gap-4 mb-8">
                    {[FaLinkedin, FaInstagram].map((Icon, idx) => (
                      <Icon
                        key={idx}
                        className="dark:text-white text-[var(--primary-color)] text-3xl cursor-pointer dark:hover:text-[var(--primary-color)]"
                      />
                    ))}
                  </div>
                </div>

                <hr className="border-black/30 dark:border-white/30 my-6" />

                <div className="relative max-w-md">
                  <div className="absolute top-2 left-2 w-full h-full opacity-10 rounded-lg shadow-xl z-0" />
                  <div className="relative z-10 rounded-lg  space-y-4 p-2 bg-white text-[var(--secondary-color)] dark:bg-[var(--secondary-color)] dark:text-white">
                    <p className="text-3xl mb-4 text-black dark:text-white">
                      Contact Us
                    </p>
                    <div className="space-y-2 text-sm leading-relaxed">
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[var(--primary-color)]" />
                        Unit 1112, 11/F, Wing On Plaza 62, Mody Road, Tsim Sha
                        Tsui East Kowloon, Hong Kong
                      </p>
                      {/* <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-[var(--primary-color)]" />{" "}
                        0-123-456-789
                      </p> */}
                      <p className="flex items-center gap-2">
                        <FaEnvelope className="text-[var(--primary-color)]" />{" "}
                        info@integratedlognet.com
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Close Button for Desktop */}
          {!isMobile && (
            <button
              className="absolute top-4 right-4 text-3xl text-[var(--secondary-color)] dark:text-white "
              onClick={() => setMenuOpen(false)}
            >
              <IoClose />
            </button>
          )}
        </div>
      )}

      <div id="google_translate_element" className="hidden" />

      <JoinFormPopup isOpen={showForm} onClose={() => setShowForm(false)} />
    </header>
  );
}
