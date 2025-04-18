
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  icon: string;
};

const services: Service[] = [
  {
    title: "Web and Internet Solutions",
    description: "Comprehensive web and internet solutions, including e-commerce, IoT, cloud, AI, BI, automation, and custom website design to drive digital transformation and innovation.",
    icon: "lovable-uploads/f4b94bb0-8e9e-47e9-abed-071d0fcdccc9.png",
  },
  {
    title: "Consultancy and Network Services",
    description: "Expert consultancy and network services, including IT solutions, network development, high-speed communication, and website design.",
    icon: "lovable-uploads/de53f01b-2296-4c44-9f49-5ad70fc1f750.png",
  },
  {
    title: "Information Technology Services",
    description: "Comprehensive IT services, including system development, hardware/software distribution, and support for individuals, businesses, and government entities globally.",
    icon: "lovable-uploads/9d4211e6-38d6-4b78-9d7a-4565efc8528e.png",
  },
  {
    title: "Software Design, Development, and IT-enabled Services",
    description: "Comprehensive IT and software services, hardware support, and tech education.",
    icon: "lovable-uploads/d2179f1c-3ce1-453f-9440-9703790ad7e7.png",
  },
  {
    title: "Franchise, Training, and Association Services",
    description: "Franchise, training, and partnerships for IT development, hardware, software, and specialized tech education.",
    icon: "lovable-uploads/f4b94bb0-8e9e-47e9-abed-071d0fcdccc9.png",
  },
];

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards(prev => [...prev, index]);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cardRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleCards]);

  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Our Range of Services</h2>
        <p className="text-gray-600 mb-10 max-w-3xl">
          We offer comprehensive data and technology solutions to help your business thrive in the digital age.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              className={cn(
                "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100",
                visibleCards.includes(index) ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-3 flex-shrink-0">
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">{service.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-block mt-2"
                >
                  Know More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
