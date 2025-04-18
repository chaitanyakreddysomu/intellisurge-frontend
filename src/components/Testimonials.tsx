import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import axios from "axios";

interface Testimonial {
  author: string;
  position: string;
  stars: number;
  Content: string;
}

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Animate titles when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".testimonials-title").forEach((el) => {
              el.classList.add("animate-text-reveal");
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get<Testimonial[]>(
          "https://intellisurgetechnologies.onrender.com/api/Client-Testimonials/"
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg testimonials-title opacity-0 text-[#0D3B66]">
            What Our Clients Say
          </h2>
          <p className="paragraph mt-4 max-w-3xl mx-auto testimonials-title opacity-0 text-[#11B5E4]">
            We've helped organizations across industries transform their technology
            infrastructure and achieve remarkable results.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="glass-morphism border-[#11B5E4]/20">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < testimonial.stars ? "text-[#dc3545]" : "text-gray-300"
                            } text-lg`}
                          ></i>
                        ))}
                      </div>
                      <p className="text-[#0D3B66] italic line-clamp-3 min-h-[72px] break-words whitespace-normal">
                        "{testimonial.Content}"
                      </p>
                      <div>
                        <h4 className="font-semibold text-[#11B5E4] line-clamp-1 break-words whitespace-normal">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-[#dc3545] break-words line-clamp-1 whitespace-normal">{testimonial.position}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="border-[#11B5E4]/20 text-[#11B5E4] hover:bg-[#11B5E4]/20 hover:text-[#0D3B66]" />
              <CarouselNext className="border-[#11B5E4]/20 text-[#11B5E4] hover:bg-[#11B5E4]/20 hover:text-[#0D3B66]" />
            </div>
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">No testimonials available.</p>
        )}
      </div>

      {/* WhatsApp + Chat floating icons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
        <a
          href="https://wa.me/9392626136?text=Hi%2C%20this%20is%20from%20IntelliSurge.%20I%20need%20some%20information."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all"
        >
          <i className="fab fa-whatsapp text-xl"></i>
        </a>
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all">
          <i className="fas fa-comment-dots text-xl"></i>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
