import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Web and Internet Solutions",
    description:
      "Comprehensive web and internet solutions, including e-commerce, IoT, cloud, AI, BI, automation, and custom website design to drive digital transformation and innovation.",
    color: "#dc3545",
    textColor: "#0D3B66",
  },
  {
    title: "Consultancy and Network Services",
    description:
      "Expert consultancy and network services, including IT solutions, network development, high-speed communication, and website design.",
    color: "#0D3B66",
    textColor: "#333",
  },
  {
    title: "Information Technology Services",
    description:
      "Comprehensive IT services, including system development, hardware/software distribution, and support for individuals, businesses, and government entities globally.",
    color: "#0D3B66",
    textColor: "#333",
  },
  {
    title: "Software Design, Development, and IT-enabled Services",
    description:
      "Comprehensive IT and software services, hardware support, and tech education.",
    color: "#dc3545",
    textColor: "#0D3B66",
  },
];

const Service = forwardRef<HTMLElement>((_, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate(); // For navigation

  return (
    <section ref={ref} id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg shadow-lg flex items-start gap-4 transition-all duration-500 cursor-pointer overflow-hidden ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? "blur-sm"
                  : ""
              } ${hoveredIndex === index ? "-translate-y-3 scale-105" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: service.color,
                  transform:
                    hoveredIndex === index ? "scale(1)" : "scale(0)",
                  transformOrigin: "top right",
                  zIndex: 0,
                }}
              ></div>

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="transition-colors duration-500"
                  style={{
                    color:
                      hoveredIndex === index
                        ? "#fff"
                        : service.textColor,
                  }}
                >
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/service")}
            className="bg-[#11B5E4] hover:bg-[#0d99c5] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
});

export default Service;
