// src/components/HeroSection.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-intellsurge-light to-white overflow-hidden bg-[#F0F8FF]">
      <Navbar /> {/* 👈 Navbar added here */}
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className='text-[#0D3B66]'>Build Your Career at </span>
              <span className="gradient-text text-[#0D3B66]">IntellSurge</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Join our team of innovative thinkers and contribute to developing cutting-edge technologies that transform industries and improve lives.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-intellsurge-primary hover:bg-intellsurge-accent text-white px-8 py-6 text-lg text-[#0D3B66]">
                View Open Positions
              </Button>
              <Button variant="outline" className="border-intellsurge-primary text-intellsurge-primary hover:bg-intellsurge-light px-8 py-6 text-lg text-[#dc3545]">
                Learn About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Team working together" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-bold text-intellsurge-primary">4.8/5</p>
              <p className="text-sm text-gray-600">Employee Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,181.3C672,203,768,213,864,208C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
