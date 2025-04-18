import React from "react";
import "./Css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#152E57] text-white border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="https://www.intellisurgetechnologies.com/images/logo-final.svg"
                alt="IntelliSurge Logo"
                className="w-24"
              />
            </div>
            <p className="text-white mb-4">
              Transforming businesses through innovative technology solutions.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://twitter.com/IntelliSurgeTec" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://www.linkedin.com/company/intellisurge-technologies/" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="https://www.facebook.com/people/IntelliSurge-Technologies/61570116219302/" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://www.instagram.com/intellisurge/" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://www.youtube.com/@IntelliSurgeTechnologies" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
              <a href="https://medium.com/@IntelliSurgeTechnologies" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-medium fa-lg"></i>
              </a>
              <a href="https://www.quora.com/profile/IntelliSurge-Technologies" className="text-white hover:text-blue-500 transition-colors">
                <i className="fab fa-quora fa-lg"></i>
                </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">Custom Software</a></li>
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">Data Analytics</a></li>
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">Cybersecurity</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-white hover:text-blue-500 transition-colors">Contact</a></li>
              <li><a href="https://www.intellisurgetechnologies.com/" target="_blank" className="text-white hover:text-blue-400 transition-colors">Previous Website</a></li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-envelope text-blue-500 mr-2"></i>
                {/* <span className="text-white">info@intellsurge.com</span> */}
                <a href="mailto:info@intellsurge.com" className="text-white hover:text-blue-500 transition-colors">info@intellsurge.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-blue-500 mr-2"></i>
                <span className="text-white">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-500 mr-2 mt-1"></i>
                <a href="https://www.google.com/maps/place/IntelliSurge+Technologies+Pvt.+Ltd./@17.4580943,78.3705127,799m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bcb930050df72ff:0xc8c72b35895e2771!8m2!3d17.4580943!4d78.3730876!16s%2Fg%2F11wwz6j_kt?entry=ttu" 
                   className="text-white hover:text-blue-500 transition-colors">
                  Company Location
                </a>
              </li>
            </ul>

            {/* Small Google Map Below */}
            <div className="mt-4 w-40 h-40 border border-gray-300 rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31110.774687328986!2d78.3705127!3d17.4580943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb930050df72ff%3A0xc8c72b35895e2771!2sIntelliSurge%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1711920608367!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © {currentYear} IntelliSurge Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-white hover:text-blue-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
