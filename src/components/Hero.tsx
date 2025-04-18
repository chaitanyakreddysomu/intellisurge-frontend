import React, { useEffect } from 'react';
import "./Css/Hero.css"
const Hero = () => {
  useEffect(() => {
    // Trigger animations after component mount
    const animateElements = () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate-text-reveal');
      });
      document.querySelectorAll('.animate-glow-element').forEach(el => {
        el.classList.add('glow-effect');
      });
    };
    
    // Small delay to ensure DOM is ready
    setTimeout(animateElements, 100);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/Cloud_updated.mp4" type="video/mp4" />
      </video>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              {/* <div className="w-6 h-6 rounded-full bg-intell-green"></div> */}
              <div className="w-6 h-6 rounded-full bg-[#dc3545]"></div>

              <div className="flex">
                <span className="text-gray-800 text-sm">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            <div className="ml-3 text-white">300+ intelligent solutions delivered</div>
          </div>
          
          <h1 className="heading-lg mb-6 text-white">
            <span className="block animate-on-scroll opacity-0">Launch your</span>
            <span 
  className="block animate-on-scroll opacity-0 animate-delay-200"
  style={{ color: "#fff" }}
>
  intelligent solution
</span>


            <span className="block animate-on-scroll opacity-0 animate-delay-300">with confidence</span>
          </h1>
          
          <p className="paragraph max-w-3xl mx-auto animate-on-scroll opacity-0 animate-delay-400 text-white">
            We provide high-quality technology development services for businesses.
            Validate your idea with a custom intelligent solution—fast, scalable, and investor-ready.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href="#contact" className="btn-primary animate-on-scroll opacity-0 animate-delay-500">
              Get Started
            </a>
            <a href="#process" className="btn-secondary animate-on-scroll opacity-0 animate-delay-500">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;