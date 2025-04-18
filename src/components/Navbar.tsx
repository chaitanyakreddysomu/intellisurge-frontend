import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Css/Navbar.css";
 
interface NavbarProps {
  onBlogClick?: () => void;
}
 
const Navbar: React.FC<NavbarProps> = ({ onBlogClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
 
  const currentPath = location.pathname;
  const isCareerPage = currentPath === "/career";
 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
 
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
 
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
 
    handleScroll();
    handleResize();
 
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 
  const handleNavClick = (sectionId: string) => {
    if (currentPath !== "/") {
      navigate(`/?scrollTo=${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };
 
  const linkColor =
    currentPath === "/" // Main page
      ? scrolled
        ? "text-[#0D3B66]"
        : "text-white"
      : currentPath === "/services" // Services page
      ? scrolled
        ? "text-white"
        : "text-[#0D3B66]"
      : "text-[#0D3B66]"; // Other pages
 
  const linkClass = `nav-link cursor-pointer transition-colors duration-300 font-medium
    text-xs sm:text-sm md:text-xs lg:text-sm ${linkColor}`;
 
  const buttonClass = `btn-primary cursor-pointer transition-all duration-300 font-semibold
    text-xs sm:text-sm md:text-xs lg:text-sm
    ${
      scrolled || isMenuOpen || isMobile
        ? "text-white bg-[#dc3545]"
        : "text-[#002645] bg-white"
    }`;
 
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-morphism" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="https://www.intellisurgetechnologies.com/images/logo-final.svg"
                alt="IntelliSurge Logo"
                className="h-8 sm:h-9 md:h-10 w-auto mr-1 sm:mr-2"
              />
            </a>
          </div>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            <a onClick={() => handleNavClick("about")} className={`relative inline-block overflow-hidden group ${linkClass}`}>
              About Us
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          <a
             onClick={() => handleNavClick("process")}
             className={`relative inline-block overflow-hidden group ${linkClass}`}
            >
                Process
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a onClick={() => handleNavClick("services")} className={`relative inline-block overflow-hidden group ${linkClass}`}>
              Services
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <a
              onClick={(e) => {
                e.preventDefault();
                onBlogClick?.();
              }}
              className={`relative inline-block overflow-hidden group ${linkClass}`}
            >
              Blog
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
            onClick={() => navigate("/career")}
             className={`relative inline-block overflow-hidden group ${linkClass}`}>
              Career
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

            </a>
            <a onClick={() => handleNavClick("partners")} className={`relative inline-block overflow-hidden group ${linkClass}`}>
              Our Partners
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              onClick={() => handleNavClick("contact")}
              className={buttonClass}
            >
              Get Started
            </a>
          </div>
 
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {!isMenuOpen ? (
              <Menu
                size={22}
                onClick={() => setIsMenuOpen(true)}
                className="text-[#0D3B66]"
              />
            ) : (
              <X
                size={22}
                onClick={() => setIsMenuOpen(false)}
                className="text-[#0D3B66]"
              />
            )}
          </div>
        </div>
 
        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-3 pt-3 pb-5 space-y-3">
            <a
              onClick={() => handleNavClick("about")}
              className={`${linkClass} block`}
            >
              About Us
            </a>
            <a
              onClick={() => handleNavClick("process")}
              className={`${linkClass} block`}
            >
              Process
            </a>
            <a
              onClick={() => handleNavClick("services")}
              className={`${linkClass} block`}
            >
              Services
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                onBlogClick?.();
                setIsMenuOpen(false);
              }}
              className={`${linkClass} block`}
            >
              Blog
            </a>
            <a
              onClick={() => {
                navigate("/career");
                setIsMenuOpen(false);
              }}
              className={`${linkClass} block`}
            >
              Career
            </a>
            <a
              onClick={() => handleNavClick("partners")}
              className={`${linkClass} block`}
            >
              Our Partners
            </a>
            <a
              onClick={() => handleNavClick("contact")}
              className={`${buttonClass} block text-center py-1.5 rounded-md`}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
 
export default Navbar;
 